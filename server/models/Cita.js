const mongoose = require('mongoose');
const validator = require('validator');

const citaSchema = new mongoose.Schema({
  medicoId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario', 
    required: true 
  },
  especialidadId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Departamento', 
    required: true 
  },
  prestacionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Prestacion', 
    required: true 
  },
  fecha: { 
    type: Date, 
    required: true,
    validate(value) {
      if (!validator.isDate(value.toString())) {
        throw new Error('Fecha inválida.');
      }
    }
  },
  hora: { 
    type: String, 
    required: true,
    validate(value) {
      if (!validator.isLength(value, { min: 5, max: 5 }) || !/^\d{2}:\d{2}$/.test(value)) {
        throw new Error('Hora inválida. Debe estar en formato HH:MM.');
      }
    }
  },
  duracion: { 
    type: Number, 
    required: true,
    min: 1,
    validate(value) {
      if (!Number.isInteger(value)) {
        throw new Error('Duración debe ser un número entero.');
      }
    }
  },
  pacienteId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario', 
    default: null 
  }
});

citaSchema.pre('save', async function(next) {
  try {
    const existingCita = await mongoose.models.Cita.findOne({
      medicoId: this.medicoId,
      fecha: this.fecha,
      hora: this.hora
    });

    if (existingCita && existingCita._id.toString() !== this._id.toString()) {
      throw new Error('Ya existe una cita para este médico en la misma fecha y hora');
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Cita', citaSchema);