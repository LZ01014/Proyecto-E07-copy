const express = require('express');
const router = express.Router();
const Aseguradora = require('../models/Aseguradora');

// Ruta para obtener todas las aseguradoras o filtradas por nombre
router.get('/aseguradoras', async (req, res) => {
  try {
    const { nombre } = req.query;
    const filtro = {};

    if (nombre) {
      filtro.nombre = new RegExp(nombre, 'i'); // Filtrar por nombre (insensible a mayúsculas)
    }

    const aseguradoras = await Aseguradora.find(filtro).populate({
      path: 'cobertura.especialidad',
      select: 'nombre',
    }).populate({
      path: 'cobertura.prestacion',
      select: 'nombre',
    });

    res.status(200).json(aseguradoras);
  } catch (error) {
    console.error('Error al obtener aseguradoras:', error);
    res.status(500).json({ message: 'Error al obtener aseguradoras', detalles: error.message });
  }
});

// Ruta para crear una nueva aseguradora
router.post('/aseguradoras', async (req, res) => {
  try {
    const { nombre, cobertura } = req.body;

    const nuevaAseguradora = await Aseguradora.create({ nombre, cobertura });

    res.status(201).json(nuevaAseguradora);
  } catch (error) {
    console.error('Error al crear aseguradora:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Error de validación', detalles: error.message });
    } else {
      res.status(500).json({ message: 'Error al crear aseguradora', detalles: error.message });
    }
  }
});

// Ruta para actualizar una aseguradora
router.put('/aseguradoras/:id', async (req, res) => {
  try {
    const aseguradoraId = req.params.id;
    const { nombre, cobertura } = req.body;

    const aseguradora = await Aseguradora.findById(aseguradoraId);

    if (!aseguradora) {
      return res.status(404).json({ message: 'Aseguradora no encontrada' });
    }

    if (nombre) aseguradora.nombre = nombre;
    if (cobertura) aseguradora.cobertura = cobertura;

    const aseguradoraActualizada = await aseguradora.save();

    res.status(200).json(aseguradoraActualizada);
  } catch (error) {
    console.error('Error al actualizar aseguradora:', error);
    res.status(500).json({ message: 'Error al actualizar aseguradora', detalles: error.message });
  }
});

// Ruta para eliminar una aseguradora por su ID
router.delete('/aseguradoras/:id', async (req, res) => {
  try {
    const aseguradora = await Aseguradora.findByIdAndDelete(req.params.id);

    if (!aseguradora) {
      return res.status(404).json({ message: 'Aseguradora no encontrada' });
    }

    res.status(200).json({ message: 'Aseguradora eliminada' });
  } catch (error) {
    console.error('Error al eliminar aseguradora:', error);
    res.status(500).json({ message: 'Error al eliminar aseguradora', detalles: error.message });
  }
});

module.exports = router;
