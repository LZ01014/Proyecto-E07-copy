const express = require('express');
const router = express.Router();
const Autorizacion = require('../models/Autorizacion'); // Corrige el nombre aquí si es necesario

// Ruta para obtener todos los Autorizaciones
router.get('/Autorizaciones', async (req, res) => {
  try {
    const Autorizaciones = await Autorizacion.find();
    res.status(200).json(Autorizaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener Autorizaciones', error });
  }
});


// Ruta para obtener un Autorizacion por ID
router.get('/Autorizaciones/:id', async (req, res) => {
  try {
    const Autorizacion = await Autorizacion.findById(req.params.id);
    if (!Autorizacion) {
      return res.status(404).json({ message: 'Autorizacion no encontrado' });
    }
    res.status(200).json(Autorizacion);
  } catch (error) {
    console.error('Error al obtener Autorizacion:', error);
    res.status(500).json({ message: 'Error al obtener Autorizacion', error });
  }
});


// Ruta para crear un Autorizacion
router.post('/Autorizaciones', async (req, res) => {
  try {
    const AutorizacionData = { ...req.body };
    const Autorizacion = new Autorizacion(AutorizacionData);
    await Autorizacion.save();
    res.status(201).json(Autorizacion);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear Autorizacion', error });
  }
});

// Ruta para actualizar un Autorizacion
router.put('/Autorizaciones/:id', async (req, res) => {
  try {
    const Autorizacion = await Autorizacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!Autorizacion) {
      return res.status(404).json({ message: 'Autorizacion no encontrado' });
    }
    res.status(200).json(Autorizacion);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar Autorizacion', error });
  }
});

// Ruta para eliminar un Autorizacion
router.delete('/Autorizaciones/:id', async (req, res) => {
  try {
    const Autorizacion = await Autorizacion.findByIdAndDelete(req.params.id);
    if (!Autorizacion) {
      return res.status(404).json({ message: 'Autorizacion no encontrado' });
    }
    res.status(200).json({ message: 'Autorizacion eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar Autorizacion', error });
  }
});


module.exports = router;
