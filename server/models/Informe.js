const mongoose = require('mongoose');
const validator = require('validator');

const informeSchema = new mongoose.Schema({
  medicoId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario', 
    required: [true, 'El ID del médico es obligatorio.'],
    validate: {
      validator: function(value) {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error('ID de médico inválido.');
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
  especialidadId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Departamento', 
    required: [true, 'El ID de la especialidad es obligatorio.'],
    validate: {
      validator: function(value) {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error('ID de especialidad inválido.');
        }
        return true;
      }
    }
  },
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
  fecha: { 
    type: Date, 
    required: [true, 'La fecha es obligatoria.'],
    validate: {
      validator: function(value) {
        if (isNaN(Date.parse(value))) {
          throw new Error('Fecha inválida.');
        }
        return true;
      }
    }
  },
  diagnostico: { 
    type: String, 
    required: [true, 'El diagnóstico es obligatorio.'],
    validate: {
      validator: function(value) {
        if (!validator.isLength(value, { min: 1, max: 1000 })) {
          throw new Error('El diagnóstico debe tener entre 1 y 1000 caracteres.');
        }
        return true;
      }
    }
  },
  observaciones: { 
    type: String,
    validate: {
      validator: function(value) {
        if (value && !validator.isLength(value, { max: 1000 })) {
          throw new Error('Las observaciones no deben exceder los 1000 caracteres.');
        }
        return true;
      }
    }
  }
});

module.exports = mongoose.model('Informe', informeSchema);