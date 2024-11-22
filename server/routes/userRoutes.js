const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const { loginLimiter, validateLogin, validateRegister } = require('../middleware/loginMiddlewares');

// Ruta para el login de usuarios
router.post('/login', [
  loginLimiter,
  ...validateLogin
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, usuario });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

// Ruta para registrar un nuevo usuario
router.post('/register', validateRegister, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const usuarioData = { ...req.body };
  const usuario = new Usuario(usuarioData);
  await usuario.save();
  res.status(201).json(usuario);
});

// Función para generar un username único
async function generarUsername(nombre, apellidos) {
  const iniciales = `${nombre.charAt(0).toLowerCase()}${apellidos.replace(/\s+/g, '').slice(0, 2).toLowerCase()}`;
  const generarNumeros = () => Math.floor(1000 + Math.random() * 9000);

  let username;
  let usernameExiste = true;

  while (usernameExiste) {
    const numeros = generarNumeros();
    username = `${iniciales}${numeros}`;

    const usuarioExistente = await Usuario.findOne({ username });
    usernameExiste = !!usuarioExistente; 
  }

  return username;
}

// Ruta para obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
});

// Ruta para crear un usuario, incluyendo la carga de imagen
router.post('/usuarios', async (req, res) => {
  try {
    // Asignar null a departamento si el valor es una cadena vacía
    if (req.body.departamento === "") {
      req.body.departamento = null;
    }

    // Genera un `username` único basado en el nombre y apellidos
    req.body.username = await generarUsername(req.body.nombre, req.body.apellidos);

    const usuarioData = { ...req.body };
    const usuario = new Usuario(usuarioData);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(400).json({ message: 'Error al crear usuario', error });
  }
});

// Ruta para eliminar un usuario
router.delete('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
});

// Ruta para actualizar un usuario
router.put('/usuarios/:id', async (req, res) => {
  try {
    const usuarioData = { ...req.body };

    // Si se está actualizando la contraseña, encriptarla antes de guardarla
    if (usuarioData.password) {
      const salt = await bcrypt.genSalt(10);
      usuarioData.password = await bcrypt.hash(usuarioData.password, salt);
    }
    console.log('ID del usuario:', req.params.id);
    console.log('Datos del usuario recibidos:', req.body);

    const usuario = await Usuario.findByIdAndUpdate(req.params.id, usuarioData, {
      new: true,
      runValidators: true
    });

    if (!usuario) {
      console.log('Usuario no encontrado');
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    console.log('Usuario actualizado con éxito:', usuario);

    res.status(200).json(usuario);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);

    if (error.errors) {
      console.error('Errores de validación:', error.errors);
    }

    res.status(400).json({ message: 'Error al actualizar usuario', error });
  }
});

// Filtrar los usuarios Médicos
router.get('/usuarios/medicos', async (req, res) => {
  const { departamentoId } = req.query;

  try {
    // Si se proporciona un departamentoId, filtramos los médicos por departamento
    let query = { tipo: 'Médico' }; // Filtramos solo los médicos

    if (departamentoId) {
      query.departamento = departamentoId; // Filtramos por el departamentoId si se ha proporcionado
    }

    // Buscar médicos con el query construido
    const medicos = await Usuario.find(query).populate('departamento'); // Asegúrate de que el campo departamentoId esté referenciando correctamente al Departamento

    res.status(200).json(medicos);
  } catch (error) {
    console.error('Error al obtener médicos:', error);
    res.status(500).json({ message: 'Error al obtener médicos', error });
  }
});


router.get('/usuarios/pacientes', async (req, res) => {
  try {
    const pacientes = await Usuario.find({ tipo: 'Paciente' });
    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pacientes', error });
  }
});

// Ruta para obtener un usuario por ID
router.get('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id); // Sin populate
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario); // Retorna el usuario con departamento como ID
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error });
  }
});


module.exports = router;