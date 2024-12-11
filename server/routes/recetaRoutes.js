const express = require('express');
const router = express.Router();
const Receta = require('../models/Receta');

// Ruta para obtener todas las recetas
router.get('/recetas', async (req, res) => {
  try {
    const { medicoId, pacienteId, fecha } = req.query;
    const filtro = {};

    if (medicoId) {
      filtro.medicoId = medicoId;
    }
    if (pacienteId) {
      filtro.pacienteId = pacienteId;
    }
    if (fecha) {
      filtro.fecha = new Date(fecha);
    }

    const recetas = await Receta.find(filtro)
      .populate('medicoId', 'nombre apellidos') 
      .populate('pacienteId', 'nombre apellidos') 
      .sort({ fecha: 1, hora: 1 }); 

    const recetasFormateadas = recetas.map(receta => ({
      ...receta.toObject(),
      fecha: receta.fecha.toISOString().split('T')[0] // Formato YYYY-MM-DD
    }));

    res.status(200).json(recetasFormateadas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener recetas', error });
  }
});

// Ruta para crear una receta
router.post('/recetas', async (req, res) => {
  try {
    const receta = new Receta(req.body);
    await receta.save();
    res.status(201).json(receta);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear receta', error });
  }
});

// Ruta para actualizar una receta
router.put('/recetas/:id', async (req, res) => {
  try {
    const receta = await Receta.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!receta) {
      return res.status(404).json({ message: 'Prestación no encontrada' });
    }
    res.status(200).json(receta);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar receta', error });
  }
});

// Ruta para eliminar una receta
router.delete('/recetas/:id', async (req, res) => {
  try {
    const receta = await Receta.findByIdAndDelete(req.params.id);
    if (!receta) {
      return res.status(404).json({ message: 'Prestación no encontrada' });
    }
    res.status(200).json({ message: 'Prestación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar receta', error });
  }
});

module.exports = router;
