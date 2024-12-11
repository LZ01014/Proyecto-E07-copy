const express = require('express');
const router = express.Router();
const Encuesta = require('../models/Encuesta'); // Corrige el nombre aquí si es necesario

// Ruta para obtener todos las encuestas
router.get('/encuestas', async (req, res) => {
  try {
    const encuestas = await Encuesta.find();
    res.status(200).json(encuestas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener encuestas', error });
  }
});


// Ruta para obtener un encuesta por ID
router.get('/encuestas/:id', async (req, res) => {
  try {
    const encuesta = await Encuesta.findById(req.params.id);
    if (!encuesta) {
      return res.status(404).json({ message: 'Encuesta no encontrado' });
    }
    res.status(200).json(encuesta);
  } catch (error) {
    console.error('Error al obtener encuesta:', error);
    res.status(500).json({ message: 'Error al obtener encuesta', error });
  }
});


// Ruta para crear un encuesta
router.post('/encuestas', async (req, res) => {
  try {
    const encuestaData = { ...req.body };
    const encuesta = new Encuesta(encuestaData);
    await encuesta.save();
    res.status(201).json(encuesta);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear encuesta', error });
  }
});

// Ruta para actualizar un encuesta
router.put('/encuestas/:id', async (req, res) => {
  try {
    const encuesta = await Encuesta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!encuesta) {
      return res.status(404).json({ message: 'Encuesta no encontrado' });
    }
    res.status(200).json(encuesta);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar encuesta', error });
  }
});

// Ruta para eliminar un encuesta
router.delete('/encuestas/:id', async (req, res) => {
  try {
    const encuesta = await Encuesta.findByIdAndDelete(req.params.id);
    if (!encuesta) {
      return res.status(404).json({ message: 'Encuesta no encontrado' });
    }
    res.status(200).json({ message: 'Encuesta eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar encuesta', error });
  }
});


module.exports = router;
