const mongoose = require('mongoose');
const validator = require('validator');

const encuestaSchema = new mongoose.Schema({
  titulo: { 
    type: String, 
    required: [true, 'El título es obligatorio.'],
    trim: true,
    minlength: [5, 'El título debe tener al menos 5 caracteres.'],
    maxlength: [100, 'El título no debe exceder los 100 caracteres.'],
    validate: {
      validator: function(value) {
        return validator.isLength(value, { min: 5, max: 100 });
      },
      message: 'El título debe tener entre 5 y 100 caracteres.'
    }
  },
  departamento: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Departamento', 
    required: [true, 'El ID del departamento es obligatorio.'],
    validate: {
      validator: function(value) {
        return mongoose.Types.ObjectId.isValid(value);
      },
      message: 'ID de departamento inválido.'
    }
  },
  preguntas: [{ 
    type: String,
    validate: {
      validator: function(value) {
        return Array.isArray(value) && value.every(pregunta => validator.isLength(pregunta, { min: 5, max: 200 }));
      },
      message: 'Cada pregunta debe tener entre 5 y 200 caracteres.'
    }
  }]
});

module.exports = mongoose.model('Encuesta', encuestaSchema);