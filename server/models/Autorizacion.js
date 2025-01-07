const mongoose = require('mongoose');
const validator = require('validator');

const autorizacionSchema = new mongoose.Schema({
  prestacionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Prestacion', 
    required: [true, 'El ID de la prestación es obligatorio.'],
    validate: {
      validator: function(value) {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error('ID de prestación inválido.');
        }
        return true;
      }
    }
  },
  pacienteId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario', 
    required: [true, 'El ID del paciente es obligatorio.'],
    validate: {
      validator: function(value) {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error('ID de paciente inválido.');
        }
        return true;
      }
    }
  },
  citaId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cita', 
    required: [true, 'El ID de la cita es obligatorio.'],
    validate: {
      validator: function(value) {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error('ID de cita inválido.');
        }
        return true;
      }
    }
  },
  autorizado: { 
    type: Boolean, 
    required: [true, 'El estado de autorización es obligatorio.'],
    default: false
  }
});

module.exports = mongoose.model('Autorizacion', autorizacionSchema);