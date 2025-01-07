process.env.NODE_ENV = 'test';

require('dotenv').config();
const chai = require('chai');
const mongoose = require('mongoose');
const Usuario = require('../../models/Usuario');
const { expect } = chai;

describe('Usuario Model', () => {
  before(async () => {
    const dbUri = process.env.MONGODB_TEST_URI;
    if (!dbUri) {
      throw new Error('MONGODB_TEST_URI no está definido');
    }
    await mongoose.connect(dbUri);
  });

  beforeEach(async () => {
    await Usuario.deleteMany({});
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
      expect(error.errors.username.message).to.equal('Nombre de usuario inválido. Debe tener al menos 3 caracteres.');
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

  it('should not create a user without nombre', async () => {
    const usuario = new Usuario({
      apellidos: 'Pérez',
      username: 'juanperez',
      password: 'Test1234',
      tipo: 'Paciente',
      email: 'juan.perez@example.com'
    });

    try {
      await usuario.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.nombre).to.exist;
      expect(error.errors.nombre.message).to.equal('Path `nombre` is required.');
    }
  });

  it('should not create a user without apellidos', async () => {
    const usuario = new Usuario({
      nombre: 'Juan',
      username: 'juanperez',
      password: 'Test1234',
      tipo: 'Paciente',
      email: 'juan.perez@example.com'
    });

    try {
      await usuario.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.apellidos).to.exist;
      expect(error.errors.apellidos.message).to.equal('Path `apellidos` is required.');
    }
  });

  it('should not create a user without username', async () => {
    const usuario = new Usuario({
      nombre: 'Juan',
      apellidos: 'Pérez',
      password: 'Test1234',
      tipo: 'Paciente',
      email: 'juan.perez@example.com'
    });

    try {
      await usuario.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.username).to.exist;
      expect(error.errors.username.message).to.equal('Path `username` is required.');
    }
  });

  it('should not create a user without password', async () => {
    const usuario = new Usuario({
      nombre: 'Juan',
      apellidos: 'Pérez',
      username: 'juanperez',
      tipo: 'Paciente',
      email: 'juan.perez@example.com'
    });

    try {
      await usuario.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.password).to.exist;
      expect(error.errors.password.message).to.equal('Path `password` is required.');
    }
  });

  it('should not create a user without tipo', async () => {
    const usuario = new Usuario({
      nombre: 'Juan',
      apellidos: 'Pérez',
      username: 'juanperez',
      password: 'Test1234',
      email: 'juan.perez@example.com'
    });

    try {
      await usuario.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.tipo).to.exist;
      expect(error.errors.tipo.message).to.equal('Path `tipo` is required.');
    }
  });

  it('should not create a user without email', async () => {
    const usuario = new Usuario({
      nombre: 'Juan',
      apellidos: 'Pérez',
      username: 'juanperez',
      password: 'Test1234',
      tipo: 'Paciente'
    });

    try {
      await usuario.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.email).to.exist;
      expect(error.errors.email.message).to.equal('Path `email` is required.');
    }
  });
});