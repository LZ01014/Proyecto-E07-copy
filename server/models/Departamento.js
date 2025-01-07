const mongoose = require('mongoose');
const validator = require('validator');

const departamentoSchema = new mongoose.Schema({
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
  tipo: { 
    type: String, 
    required: true, 
    enum: ["Especialidad médica", "Administración"] 
  },
  prestaciones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prestacion', 
    required: false
  }]
});

module.exports = mongoose.model('Departamento', departamentoSchema);