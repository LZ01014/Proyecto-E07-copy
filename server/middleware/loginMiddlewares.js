const rateLimit = require('express-rate-limit');
const { check } = require('express-validator');

// Configura el middleware de limitación de tasa
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: 'Demasiados intentos de inicio de sesión, por favor intente de nuevo más tarde.'
});

// Validación de entradas
const validateLogin = [
  check('username').isString().notEmpty().withMessage('El nombre de usuario es obligatorio'),
  check('password').isString().notEmpty().withMessage('La contraseña es obligatoria')
];

const validateRegister = [
  check('nombre').not().isEmpty().withMessage('El nombre es obligatorio'),
  check('apellidos').not().isEmpty().withMessage('Los apellidos son obligatorios'),
  check('username').not().isEmpty().withMessage('El nombre de usuario es obligatorio'),
  check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  check('email').isEmail().withMessage('Debe ser un email válido')
];

module.exports = {
  loginLimiter,
  validateLogin,
  validateRegister
};