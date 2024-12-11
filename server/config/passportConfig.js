const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { google } = require('googleapis');
const Usuario = require('../models/Usuario');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generarUsername } = require('../utils'); 
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/auth/google/callback"
);

const genderMap = {
  male: 'Masculino',
  female: 'Femenino',
  other: 'No especificado'
};

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/user.birthday.read', 'https://www.googleapis.com/auth/user.gender.read'],
  prompt: 'consent'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Configura el cliente OAuth2 con el token de acceso
    oauth2Client.setCredentials({ access_token: accessToken });

    // Llamada a la People API para obtener información adicional
    const people = google.people({ version: 'v1', auth: oauth2Client });
    const me = await people.people.get({
      resourceName: 'people/me',
      personFields: 'birthdays,genders,photos',
    });

    const birthday = me.data.birthdays ? me.data.birthdays[0].date : null;
    const gender = me.data.genders ? genderMap[me.data.genders[0].value] || 'No especificado' : 'No especificado';
    const photo = me.data.photos ? me.data.photos[0].url : null;

    let usuario = await Usuario.findOne({ googleId: profile.id });
    if (!usuario) {
      usuario = await Usuario.findOne({ email: profile.emails[0].value });
      if (usuario) {
        usuario.googleId = profile.id;
      } else {
        const randomPassword = crypto.randomBytes(8).toString('hex'); 
        const hashedPassword = await bcrypt.hash(randomPassword, 10);
        const username = await generarUsername(profile.name.givenName, profile.name.familyName || 'Apellido');

        usuario = new Usuario({
          googleId: profile.id,
          nombre: profile.name.givenName,
          apellidos: profile.name.familyName || 'Apellido no proporcionado',
          email: profile.emails[0].value,
          username: username, 
          password: hashedPassword, 
          tipo: 'Paciente',
          genero: gender,
          fechaNacimiento: birthday ? new Date(birthday.year, birthday.month - 1, birthday.day) : null,
          telefono: null,
          foto: profile.photos[0].value
        });
      }
      await usuario.save();
    }
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    usuario.token = token;
    done(null, usuario);
  } catch (error) {
    console.error('Error en la autenticación:', error);
    done(error, null);
  }
}));

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const usuario = await Usuario.findById(id);
    done(null, usuario);
  } catch (error) {
    done(error, null);
  }
});