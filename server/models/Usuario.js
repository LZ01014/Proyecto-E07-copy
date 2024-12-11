const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
    validate(value) {
      if (!validator.isAlpha(value, 'es-ES', { ignore: ' ' })) {
        throw new Error('Nombre inválido. Solo se permiten letras y espacios.');
      }
    }
  },
  apellidos: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
    validate(value) {
      if (!validator.isAlpha(value, 'es-ES', { ignore: ' ' })) {
        throw new Error('Apellidos inválidos. Solo se permiten letras y espacios.');
      }
    }
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
    validate(value) {
      if (!validator.isAlphanumeric(value, 'es-ES')) {
        throw new Error('Nombre de usuario inválido. Solo se permiten letras y números.');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 100,
    validate(value) {
      if (!validator.isLength(value, { min: 6 })) {
        throw new Error('La contraseña debe tener al menos 6 caracteres.');
      }
      if (!/[A-Z]/.test(value)) {
        throw new Error('La contraseña debe contener al menos una letra mayúscula.');
      }
      if (!/[a-z]/.test(value)) {
        throw new Error('La contraseña debe contener al menos una letra minúscula.');
      }
      if (!/[0-9]/.test(value)) {
        throw new Error('La contraseña debe contener al menos un número.');
      }
    }
  },
  tipo: {
    type: String,
    required: true,
    enum: ['Paciente', 'Doctor', 'Administrador']
  },
  departamento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Departamento',
    default: null
  },
  dni: {
    type: String,
    validate(value) {
      if (value && !validator.isLength(value, { min: 9, max: 9 })) {
        throw new Error('DNI inválido. Debe tener 9 caracteres.');
      }
    }
  },
  fechaNacimiento: {
    type: Date,
    validate(value) {
      if (value && isNaN(Date.parse(value))) {
        throw new Error('Fecha de nacimiento inválida.');
      }
      if (value && new Date(value) > new Date()) {
        throw new Error('Fecha de nacimiento no puede ser una fecha futura.');
      }
    }
  },
  genero: {
    type: String,
    enum: ['Masculino', 'Femenino', 'No especificado']
  },
  direccion: {
    type: String,
    trim: true,
    validate(value) {
      if (value && !validator.isLength(value, { min: 10, max: 100 })) {
        throw new Error('La dirección debe tener entre 10 y 100 caracteres.');
      }
    }
  },
  telefono: {
    type: String,
    trim: true,
    validate(value) {
      if (value && !validator.isMobilePhone(value, 'es-ES')) {
        throw new Error('Número de teléfono inválido.');
      }
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email inválido.');
      }
      if (!validator.isLength(value, { max: 100 })) {
        throw new Error('El email no puede exceder los 100 caracteres.');
      }
    }
  },
  foto: {
    type: String,
    default: null,
  },
  fechaUltimoAcceso: {
    type: Date,
    default: null
  },
  estado: {
    type: String,
    default: 'activo'
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre('save', async function(next) {
  try {
    const existingUser = await mongoose.models.Usuario.findOne({ username: this.username });
    if (existingUser && existingUser._id.toString() !== this._id.toString()) {
      throw new Error('El nombre de usuario ya está en uso');
    }

    const existingEmail = await mongoose.models.Usuario.findOne({ email: this.email });
    if (existingEmail && existingEmail._id.toString() !== this._id.toString()) {
      throw new Error('El email ya está en uso');
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Usuario', userSchema);
