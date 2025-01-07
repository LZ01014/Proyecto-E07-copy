const mongoose = require('mongoose');
const validator = require('validator');

const prestacionSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    minlength: [2, 'Nombre inválido. Debe tener entre 2 y 100 caracteres.'],
    maxlength: [100, 'Nombre inválido. Debe tener entre 2 y 100 caracteres.'],
    validate(value) {
      if (!validator.isLength(value, { min: 2, max: 100 })) {
        throw new Error('Nombre inválido. Debe tener entre 2 y 100 caracteres.');
      }
    }
  },
  descripcion: { 
    type: String,
    trim: true,
    validate(value) {
      if (value && !validator.isLength(value, { max: 500 })) {
        throw new Error('Descripción inválida. No debe exceder los 500 caracteres.');
      }
    }
  },
  indicaciones: { 
    type: String,
    trim: true,
    validate(value) {
      if (value && !validator.isLength(value, { max: 1000 })) {
        throw new Error('Indicaciones inválidas. No deben exceder los 1000 caracteres.');
      }
    }
  },
});

module.exports = mongoose.model('Prestacion', prestacionSchema);