const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const http = require('http');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bodyParser = require('body-parser');
require('./config/passportConfig');

// Ejecucción: nodemon server.js

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


// Define los orígenes permitidos
const allowedOrigins = [
  'https://hospital-rambla.netlify.app', // URL del sitio en Netlify
  'http://localhost:8080',                    // Para desarrollo local
  'http://localhost:8081',
  'https://sistema-gestor-hospitalario.onrender.com'   
];

// Configura el middleware de CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origen no permitido por CORS: ${origin}`));
    }
  },
  credentials: true
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Middleware para procesar JSON en el cuerpo de las solicitudes
app.use(express.json());
app.use(cookieParser());

// Middleware para loggear todas las solicitudes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
  next();
});

// Configurar sesiones
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Inicializa Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas de autenticación con Google
const authRoutes = require('./routes/authRoutes.js');
app.use(authRoutes);

// Conexión a MongoDB Atlas
const dbUri = process.env.NODE_ENV === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI;
mongoose.connect(dbUri)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((error) => console.error('Error al conectar a MongoDB Atlas:', error));

// Ruta principal de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido al backend');
});

// Rutas de usuarios
const userRoutes = require('./routes/userRoutes');
const departamentoRoutes = require('./routes/departamentoRoutes');
const medicoCitasRoutes = require('./routes/medicoCitas');
const prestacionRoutes = require('./routes/prestacionRoutes');
const medicoCitas = require('./routes/medicoCitas');
const recetaRoutes = require('./routes/recetaRoutes');
const contactFormsRoutes = require('./routes/contactFormsRoutes');
const encuestaRoutes = require('./routes/encuestaRoutes');
const informeRoutes = require('./routes/informeRoutes');
const autorizacionRoutes = require('./routes/autorizacionRoutes');

app.use('/api', userRoutes);         // Rutas para usuarios
app.use('/api', departamentoRoutes); // Rutas para departamentos
app.use('/api', medicoCitasRoutes);     // Rutas para citas médicas
app.use('/api', prestacionRoutes); // Rutas para prestaciones
app.use('/api', medicoCitas); // Rutas para citas médicas
app.use('/api', recetaRoutes); // Rutas para recetas
app.use('/api', contactFormsRoutes); // Rutas para contact_forms
app.use('/api', encuestaRoutes); // Rutas para encuestas
app.use('/api', informeRoutes); // Rutas para informes
app.use('/api', autorizacionRoutes); // Rutas para autorizaciones

// Crear el servidor HTTP
const server = http.createServer(app);

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

// Exportar la instancia del servidor
module.exports = server;
