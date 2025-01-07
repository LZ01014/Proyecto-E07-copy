process.env.NODE_ENV = 'test';

require('dotenv').config();
const chai = require('chai');
const mongoose = require('mongoose');
const Departamento = require('../../models/Departamento');
const { expect } = chai;

describe('Departamento Model', () => {
  before(async () => {
    const dbUri = process.env.MONGODB_TEST_URI;
    if (!dbUri) {
      throw new Error('MONGODB_TEST_URI no está definido');
    }
    await mongoose.connect(dbUri);
  });

  beforeEach(async () => {
    await Departamento.deleteMany({});
  });

  after(async () => {
    await Departamento.deleteMany({});
    await mongoose.connection.close();
  });

  it('should create a valid departamento', async () => {
    const departamento = new Departamento({
      nombre: 'Cardiología',
      tipo: 'Especialidad médica'
    });

    const savedDepartamento = await departamento.save();
    expect(savedDepartamento._id).to.exist;
    expect(savedDepartamento.nombre).to.equal('Cardiología');
    expect(savedDepartamento.tipo).to.equal('Especialidad médica');
  });

  it('should not create a departamento with short nombre', async () => {
    const departamento = new Departamento({
      nombre: 'C',
      tipo: 'Especialidad médica'
    });

    try {
      await departamento.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.nombre).to.exist;
      expect(error.errors.nombre.message).to.equal('Nombre inválido. Debe tener entre 2 y 100 caracteres.');
    }
  });

  it('should not create a departamento with long nombre', async () => {
    const departamento = new Departamento({
      nombre: 'a'.repeat(101),
      tipo: 'Especialidad médica'
    });

    try {
      await departamento.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.nombre).to.exist;
      expect(error.errors.nombre.message).to.equal('Nombre inválido. Debe tener entre 2 y 100 caracteres.');
    }
  });

  it('should not create a departamento with invalid tipo', async () => {
    const departamento = new Departamento({
      nombre: 'Cardiología',
      tipo: 'Tipo inválido'
    });

    try {
      await departamento.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.tipo).to.exist;
      expect(error.errors.tipo.message).to.equal('`Tipo inválido` is not a valid enum value for path `tipo`.');
    }
  });

  it('should not create a departamento without nombre', async () => {
    const departamento = new Departamento({
      tipo: 'Especialidad médica'
    });

    try {
      await departamento.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.nombre).to.exist;
      expect(error.errors.nombre.message).to.equal('Path `nombre` is required.');
    }
  });

  it('should not create a departamento without tipo', async () => {
    const departamento = new Departamento({
      nombre: 'Cardiología'
    });

    try {
      await departamento.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.tipo).to.exist;
      expect(error.errors.tipo.message).to.equal('Path `tipo` is required.');
    }
  });

  it('should not create a departamento with duplicate nombre', async () => {
    const departamento1 = new Departamento({
      nombre: 'Cardiología',
      tipo: 'Especialidad médica'
    });

    const departamento2 = new Departamento({
      nombre: 'Cardiología',
      tipo: 'Administración'
    });

    await departamento1.save();

    try {
      await departamento2.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.code).to.equal(11000); 
    }
  });
});