const mongoose = require('mongoose');
const { TriggerOpTypes } = require('vue');

const autorizacionSchema = new mongoose.Schema({
  prestacionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prestacion', required: true },
  pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  citaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cita', required: true },
  autorizado: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model('Autorizacion', autorizacionSchema);
