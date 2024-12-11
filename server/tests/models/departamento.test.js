const chai = require('chai');
const mongoose = require('mongoose');
const Departamento = require('../models/Departamento');
const { expect } = chai;

describe('Departamento Model', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
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
      tipo: 'Invalid Tipo'
    });

    try {
      await departamento.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.tipo).to.exist;
      expect(error.errors.tipo.message).to.equal('`Invalid Tipo` is not a valid enum value for path `tipo`.');
    }
  });

  it('should not create a departamento with duplicate nombre', async () => {
    const departamento1 = new Departamento({
      nombre: 'Cardiología',
      tipo: 'Especialidad médica'
    });
    await departamento1.save();

    const departamento2 = new Departamento({
      nombre: 'Cardiología',
      tipo: 'Administración'
    });

    try {
      await departamento2.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.code).to.equal(11000); // Código de error para duplicados en MongoDB
    }
  });
});