const express = require('express');
const router = express.Router();
const Prestacion = require('../models/Prestacion');

// Ruta para obtener todas las prestaciones
router.get('/prestaciones', async (req, res) => {
  try {
    const prestaciones = await Prestacion.find();
    res.status(200).json(prestaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener prestaciones', error });
  }
});

// Ruta para crear una prestación
router.post('/prestaciones', async (req, res) => {
  try {
    const prestacion = new Prestacion(req.body);
    await prestacion.save();
    res.status(201).json(prestacion);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear prestación', error });
  }
});

// Ruta para actualizar una prestación
router.put('/prestaciones/:id', async (req, res) => {
  try {
    const prestacion = await Prestacion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!prestacion) {
      return res.status(404).json({ message: 'Prestación no encontrada' });
    }
    res.status(200).json(prestacion);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar prestación', error });
  }
});

// Ruta para eliminar una prestación
router.delete('/prestaciones/:id', async (req, res) => {
  try {
    const prestacion = await Prestacion.findByIdAndDelete(req.params.id);
    if (!prestacion) {
      return res.status(404).json({ message: 'Prestación no encontrada' });
    }
    res.status(200).json({ message: 'Prestación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar prestación', error });
  }
});

module.exports = router;
