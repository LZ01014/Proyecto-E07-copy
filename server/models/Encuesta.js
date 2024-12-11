const mongoose = require('mongoose');

const encuestaSchema = new mongoose.Schema({
  titulo: { type: String, required: true},
  departamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Departamento', required: true },
  preguntas: [{ type: String }],
});

module.exports = mongoose.model('Encuesta', encuestaSchema);
