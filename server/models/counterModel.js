const mongoose = require('mongoose');
const validator = require('validator');

const counterSchema = new mongoose.Schema({
  model: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
    validate(value) {
      if (!validator.isLength(value, { min: 2, max: 100 })) {
        throw new Error('Model inválido. Debe tener entre 2 y 100 caracteres.');
      }
    }
  },
  count: { 
    type: Number, 
    default: 0,
    min: 0,
    validate(value) {
      if (!Number.isInteger(value)) {
        throw new Error('Count debe ser un número entero.');
      }
    }
  },
});

module.exports = mongoose.model('Counter', counterSchema);