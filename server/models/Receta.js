const mongoose = require('mongoose');
const validator = require('validator');

const recetaSchema = new mongoose.Schema({
  medicoId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario', 
    required: true 
  },
  pacienteId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario', 
    required: true 
  },
  fecha: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(value) {
        return !isNaN(Date.parse(value));
      },
      message: 'Fecha inválida.'
    }
  },
  hora: { 
    type: String, 
    required: true,
    validate: {
      validator: function(value) {
        return validator.isLength(value, { min: 5, max: 5 }) && /^\d{2}:\d{2}$/.test(value);
      },
      message: 'Hora inválida. Debe estar en formato HH:MM.'
    }
  },
  medicamentos: { 
    type: String, 
    required: [true, 'Medicamentos inválidos. Se requiere este campo.'],
    minlength: [1, 'Medicamentos inválidos. Deben tener al menos 1 caracter.'],
    maxlength: [500, 'Medicamentos inválidos. No deben exceder los 500 caracteres.'],
    validate: {
      validator: function(value) {
        return validator.isLength(value, { min: 1, max: 500 });
      },
      message: 'Medicamentos inválidos. Deben tener entre 1 y 500 caracteres.'
    }
  },
  observaciones: { 
    type: String,
    validate: {
      validator: function(value) {
        return !value || validator.isLength(value, { max: 1000 });
      },
      message: 'Observaciones inválidas. No deben exceder los 1000 caracteres.'
    }
  }
});

recetaSchema.pre('save', async function(next) {
  try {
    const existingReceta = await mongoose.models.Receta.findOne({
      medicoId: this.medicoId,
      pacienteId: this.pacienteId,
      fecha: this.fecha,
      hora: this.hora
    });

    if (existingReceta && existingReceta._id.toString() !== this._id.toString()) {
      throw new Error('Ya existe una receta para este médico y paciente en la misma fecha y hora');
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Receta', recetaSchema);