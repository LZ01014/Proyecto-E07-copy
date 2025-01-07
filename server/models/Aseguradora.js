const mongoose = require('mongoose');
const validator = require('validator');

const aseguradoraSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la aseguradora es obligatorio.'],
    trim: true,
  },
  cobertura: [
    {
      especialidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departamento', // Referencia al modelo de Departamento médico
        required: false,
      },
      prestacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prestacion', // Referencia al modelo de Prestación
        required: false,
      },
      tarifa: {
        type: String,
        required: false,
        validate(value) {
          if (value && !validator.isNumeric(value)) {
            throw new Error('La tarifa debe contener solo dígitos numéricos.');
          }
        },
      },
      foto: {
        type: String,
        default: null,
      },
    },
  ],
});

module.exports = mongoose.model('Aseguradora', aseguradoraSchema);
