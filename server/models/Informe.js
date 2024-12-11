const mongoose = require('mongoose');
const { TriggerOpTypes } = require('vue');

const informeSchema = new mongoose.Schema({
  medicoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  especialidadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Departamento', required: true },
  prestacionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prestacion', required: true },
  citaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cita', required: true },
  autorizacionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Autorizacion', required: true },
  fecha: { 
    type: Date, 
    required: true,
    validate(value) {
      if (!validator.isDate(value.toString())) {
        throw new Error('Fecha inválida.');
      }
    }
  },
  tipo: { type: String, required: true }, // falta por confirmar los posibles valores
});

module.exports = mongoose.model('Informe', informeSchema);
