const express = require('express');
const router = express.Router();
const passport = require('passport');

// Ruta para iniciar sesión con Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de callback para Google
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:8080/login' }),
  (req, res) => {
    // Almacenar el token JWT en una cookie
    res.cookie('token', req.user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 3600000 
    });
    res.redirect('http://localhost:8080/iniciopaciente');
  }
);

// Ruta para obtener la información del usuario después de iniciar sesión con Google
router.get('/auth/google/success', (req, res) => {
  if (req.user) {
    res.json({ usuario: req.user });
  } else {
    res.status(401).json({ message: 'No autenticado' });
  }
});

module.exports = router;