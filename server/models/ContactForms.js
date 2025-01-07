const mongoose = require('mongoose');
const validator = require('validator');

const contactFormSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
    validate(value) {
      if (!validator.isAlpha(value, 'es-ES', { ignore: ' ' })) {
        throw new Error('Nombre inválido. Solo se permiten letras y espacios.');
      }
    }
  },
  correo: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Correo inválido.');
      }
      if (!validator.isLength(value, { max: 100 })) {
        throw new Error('El correo no puede exceder los 100 caracteres.');
      }
    }
  },
  asunto: { 
    type: String, 
    required: true,
    trim: true,
    minlength: [5, 'Asunto inválido. Debe tener entre 5 y 100 caracteres.'],
    maxlength: [100, 'Asunto inválido. Debe tener entre 5 y 100 caracteres.'],
    validate(value) {
      if (!validator.isLength(value, { min: 5, max: 100 })) {
        throw new Error('Asunto inválido. Debe tener entre 5 y 100 caracteres.');
      }
    }
  },
  mensaje: { 
    type: String, 
    required: true,
    trim: true,
    minlength: [10, 'Mensaje inválido. Debe tener entre 10 y 1000 caracteres.'],
    maxlength: [1000, 'Mensaje inválido. Debe tener entre 10 y 1000 caracteres.'],
    validate(value) {
      if (!validator.isLength(value, { min: 10, max: 1000 })) {
        throw new Error('Mensaje inválido. Debe tener entre 10 y 1000 caracteres.');
      }
    }
  }
});

module.exports = mongoose.model('ContactForm', contactFormSchema);