const express = require('express');
const router = express.Router();
const ContactForm = require('../models/ContactForms');

// Ruta para obtener todas las contact_forms
router.get('/contact_forms', async (req, res) => {
  try {
    const contact_forms = await ContactForm.find();
    res.status(200).json(contact_forms);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener contact_forms', error });
  }
});

// Ruta para crear una prestación
router.post('/contact_forms', async (req, res) => {
  try {
    const contact_form = new ContactForm(req.body);
    await contact_form.save();
    res.status(201).json(contact_form);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear prestación', error });
  }
});

// Ruta para actualizar una prestación
router.put('/contact_forms/:id', async (req, res) => {
  try {
    const contact_form = await ContactForm.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!contact_form) {
      return res.status(404).json({ message: 'Prestación no encontrada' });
    }
    res.status(200).json(contact_form);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar prestación', error });
  }
});

// Ruta para eliminar una prestación
router.delete('/contact_forms/:id', async (req, res) => {
  try {
    const contact_form = await ContactForm.findByIdAndDelete(req.params.id);
    if (!contact_form) {
      return res.status(404).json({ message: 'Prestación no encontrada' });
    }
    res.status(200).json({ message: 'Prestación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar prestación', error });
  }
});

module.exports = router;
