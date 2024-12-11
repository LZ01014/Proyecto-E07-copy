const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Usuario = require('../models/Usuario'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { generarUsername } = require('../utils');
const { loginLimiter, validateLogin, validateRegister } = require('../middleware/loginMiddlewares');

// Ruta para el login de usuarios
router.post('/login', [
  //loginLimiter,
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

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'Strict',
      maxAge: 3600000 
    });

    res.json({ token, usuario });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

router.get('/check-auth', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
    
    const usuario = await Usuario.findById(decoded.id);

    if (!usuario) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    res.json({ user: usuario });
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
    console.error('Error al verificar autenticación:', error);
    res.status(500).json({ message: 'Error al verificar autenticación' });
  }
});

// Ruta para cerrar sesión
router.post('/logout', (req, res) => {
  res.cookie('token', '', { maxAge: 0 });
  res.cookie('connect.sid', '', { maxAge: 0 });
  res.status(200).json({ message: 'Sesión cerrada correctamente' });
});

// Ruta para obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    /*
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'Administración') {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    */

    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
});

// Ruta para crear un usuario, incluyendo la carga de imagen
router.post('/usuarios', validateRegister, async (req, res) => {
  try {
    if (req.body.departamento === "") {
      req.body.departamento = null;
    }

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

    if (!usuarioData.departamento) {
      delete usuarioData.departamento;
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