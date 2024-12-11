const express = require('express');
const router = express.Router();
const Departamento = require('../models/Departamento'); // Corrige el nombre aquí si es necesario

// Ruta para obtener todos los departamentos
router.get('/departamentos', async (req, res) => {
  try {
    const departamentos = await Departamento.find();
    res.status(200).json(departamentos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener departamentos', error });
  }
});

router.get('/departamentos/especialidades', async (req, res) => {
  try {
    // Buscar solo los departamentos donde el tipo sea "Especialidad médica"
    const especialidades = await Departamento.find({ tipo: "Especialidad médica" });
    res.status(200).json(especialidades);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener especialidades', error });
  }
});


// Ruta para obtener un departamento por ID
router.get('/departamentos/:id', async (req, res) => {
  try {
    const departamento = await Departamento.findById(req.params.id).populate('prestaciones');
    if (!departamento) {
      return res.status(404).json({ message: 'Departamento no encontrado' });
    }
    res.status(200).json(departamento);
  } catch (error) {
    console.error('Error al obtener departamento:', error);
    res.status(500).json({ message: 'Error al obtener departamento', error });
  }
});


// Ruta para crear un departamento
router.post('/departamentos', async (req, res) => {
  try {
    const departamentoData = { ...req.body };
    const departamento = new Departamento(departamentoData);
    await departamento.save();
    res.status(201).json(departamento);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear departamento', error });
  }
});

// Ruta para actualizar un departamento
router.put('/departamentos/:id', async (req, res) => {
  try {
    const departamento = await Departamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!departamento) {
      return res.status(404).json({ message: 'Departamento no encontrado' });
    }
    res.status(200).json(departamento);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar departamento', error });
  }
});

// Ruta para eliminar un departamento
router.delete('/departamentos/:id', async (req, res) => {
  try {
    const departamento = await Departamento.findByIdAndDelete(req.params.id);
    if (!departamento) {
      return res.status(404).json({ message: 'Departamento no encontrado' });
    }
    res.status(200).json({ message: 'Departamento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar departamento', error });
  }
});


module.exports = router;
