const express = require('express');
const router = express.Router();
const Informe = require('../models/Informe'); // Corrige el nombre aquí si es necesario

// Ruta para obtener todos las informes
router.get('/informes', async (req, res) => {
  try {
    const informes = await Informe.find();
    res.status(200).json(informes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener informes', error });
  }
});


// Ruta para obtener un informe por ID
router.get('/informes/:id', async (req, res) => {
  try {
    const informe = await Informe.findById(req.params.id);
    if (!informe) {
      return res.status(404).json({ message: 'Informe no encontrado' });
    }
    res.status(200).json(informe);
  } catch (error) {
    console.error('Error al obtener informe:', error);
    res.status(500).json({ message: 'Error al obtener informe', error });
  }
});


// Ruta para crear un informe
router.post('/informes', async (req, res) => {
  try {
    const { medicoId, pacienteId, especialidadId, prestacionId, citaId, fecha, diagnostico, observaciones } = req.body;

    // Verificar que todos los campos requeridos estén presentes
    if (!medicoId || !pacienteId || !especialidadId || !prestacionId || !citaId || !fecha || !diagnostico) {
      return res.status(400).json({ message: 'Todos los campos requeridos deben estar presentes' });
    }

    const nuevoInforme = new Informe({
      medicoId,
      pacienteId,
      especialidadId,
      prestacionId,
      citaId,
      fecha,
      diagnostico,
      observaciones
    });

    await nuevoInforme.save();
    res.status(201).json(nuevoInforme);
  } catch (error) {
    console.error('Error al crear informe:', error);
    res.status(500).json({ message: 'Error al crear informe', error });
  }
});

// Ruta para actualizar un informe
router.put('/informes/:id', async (req, res) => {
  try {
    const informe = await Informe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!informe) {
      return res.status(404).json({ message: 'Informe no encontrado' });
    }
    res.status(200).json(informe);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar informe', error });
  }
});

// Ruta para eliminar un informe
router.delete('/informes/:id', async (req, res) => {
  try {
    const informe = await Informe.findByIdAndDelete(req.params.id);
    if (!informe) {
      return res.status(404).json({ message: 'Informe no encontrado' });
    }
    res.status(200).json({ message: 'Informe eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar informe', error });
  }
});


module.exports = router;
