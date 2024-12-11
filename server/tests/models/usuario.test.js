const chai = require('chai');
const mongoose = require('mongoose');
const Usuario = require('../../models/Usuario');
const { expect } = chai;

describe('Usuario Model', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('should create a valid user', async () => {
    const usuario = new Usuario({
      nombre: 'Juan',
      apellidos: 'Pérez',
      username: 'juanperez',
      password: 'Test1234',
      tipo: 'Paciente',
      email: 'juan.perez@example.com'
    });

    const savedUser = await usuario.save();
    expect(savedUser._id).to.exist;
    expect(savedUser.nombre).to.equal('Juan');
    expect(savedUser.apellidos).to.equal('Pérez');
  });

  it('should not create a user with invalid email', async () => {
    const usuario = new Usuario({
      nombre: 'Juan',
      apellidos: 'Pérez',
      username: 'juanperez',
      password: 'Test1234',
      tipo: 'Paciente',
      email: 'invalid-email'
    });

    try {
      await usuario.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.email).to.exist;
      expect(error.errors.email.message).to.equal('Email inválido.');
    }
  });

  it('should not create a user with short username', async () => {
    const usuario = new Usuario({
      nombre: 'Juan',
      apellidos: 'Pérez',
      username: 'jp',
      password: 'Test1234',
      tipo: 'Paciente',
      email: 'juan.perez@example.com'
    });

    try {
      await usuario.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.username).to.exist;
      expect(error.errors.username.message).to.equal('Nombre de usuario inválido. Solo se permiten letras y números.');
    }
  });

  it('should not create a user with invalid DNI', async () => {
    const usuario = new Usuario({
      nombre: 'Juan',
      apellidos: 'Pérez',
      username: 'juanperez',
      password: 'Test1234',
      tipo: 'Paciente',
      email: 'juan.perez@example.com',
      dni: '123'
    });

    try {
      await usuario.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.dni).to.exist;
      expect(error.errors.dni.message).to.equal('DNI inválido. Debe tener 9 caracteres.');
    }
  });

  it('should not create a user with invalid phone number', async () => {
    const usuario = new Usuario({
      nombre: 'Juan',
      apellidos: 'Pérez',
      username: 'juanperez',
      password: 'Test1234',
      tipo: 'Paciente',
      email: 'juan.perez@example.com',
      telefono: '12345'
    });

    try {
      await usuario.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.telefono).to.exist;
      expect(error.errors.telefono.message).to.equal('Número de teléfono inválido.');
    }
  });
});