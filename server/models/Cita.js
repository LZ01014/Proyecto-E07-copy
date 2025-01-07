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
  fechaHora: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(value) {
        if (isNaN(Date.parse(value))) {
          throw new Error('Fecha y hora inválidas.');
        }
        return true;
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
      fechaHora: this.fechaHora,
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