const express = require('express');
const router = express.Router();
const Informe = require('../models/Informe'); // Corrige el nombre aquí si es necesario

// Ruta para obtener todos los Informes
router.get('/Informes', async (req, res) => {
  try {
    const Informes = await Informe.find();
    res.status(200).json(Informes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener Informes', error });
  }
});


// Ruta para obtener un Informe por ID
router.get('/Informes/:id', async (req, res) => {
  try {
    const Informe = await Informe.findById(req.params.id);
    if (!Informe) {
      return res.status(404).json({ message: 'Informe no encontrado' });
    }
    res.status(200).json(Informe);
  } catch (error) {
    console.error('Error al obtener Informe:', error);
    res.status(500).json({ message: 'Error al obtener Informe', error });
  }
});


// Ruta para crear un Informe
router.post('/Informes', async (req, res) => {
  try {
    const InformeData = { ...req.body };
    const Informe = new Informe(InformeData);
    await Informe.save();
    res.status(201).json(Informe);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear Informe', error });
  }
});

// Ruta para actualizar un Informe
router.put('/Informes/:id', async (req, res) => {
  try {
    const Informe = await Informe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!Informe) {
      return res.status(404).json({ message: 'Informe no encontrado' });
    }
    res.status(200).json(Informe);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar Informe', error });
  }
});

// Ruta para eliminar un Informe
router.delete('/Informes/:id', async (req, res) => {
  try {
    const Informe = await Informe.findByIdAndDelete(req.params.id);
    if (!Informe) {
      return res.status(404).json({ message: 'Informe no encontrado' });
    }
    res.status(200).json({ message: 'Informe eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar Informe', error });
  }
});


module.exports = router;
