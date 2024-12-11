const chai = require('chai');
const mongoose = require('mongoose');
const Prestacion = require('../models/Prestacion');
const { expect } = chai;

describe('Prestacion Model', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  after(async () => {
    await Prestacion.deleteMany({});
    await mongoose.connection.close();
  });

  it('should create a valid prestacion', async () => {
    const prestacion = new Prestacion({
      nombre: 'Consulta General',
      descripcion: 'Consulta médica general',
      indicaciones: 'Asistir en ayunas'
    });

    const savedPrestacion = await prestacion.save();
    expect(savedPrestacion._id).to.exist;
    expect(savedPrestacion.nombre).to.equal('Consulta General');
  });

  it('should not create a prestacion with short nombre', async () => {
    const prestacion = new Prestacion({
      nombre: 'C',
      descripcion: 'Consulta médica general',
      indicaciones: 'Asistir en ayunas'
    });

    try {
      await prestacion.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.nombre).to.exist;
      expect(error.errors.nombre.message).to.equal('Nombre inválido. Debe tener entre 2 y 100 caracteres.');
    }
  });

  it('should not create a prestacion with long descripcion', async () => {
    const prestacion = new Prestacion({
      nombre: 'Consulta General',
      descripcion: 'a'.repeat(501),
      indicaciones: 'Asistir en ayunas'
    });

    try {
      await prestacion.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.descripcion).to.exist;
      expect(error.errors.descripcion.message).to.equal('Descripción inválida. No debe exceder los 500 caracteres.');
    }
  });

  it('should not create a prestacion with long indicaciones', async () => {
    const prestacion = new Prestacion({
      nombre: 'Consulta General',
      descripcion: 'Consulta médica general',
      indicaciones: 'a'.repeat(1001)
    });

    try {
      await prestacion.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.indicaciones).to.exist;
      expect(error.errors.indicaciones.message).to.equal('Indicaciones inválidas. No deben exceder los 1000 caracteres.');
    }
  });

  it('should not create a prestacion with duplicate nombre', async () => {
    const prestacion1 = new Prestacion({
      nombre: 'Consulta General',
      descripcion: 'Consulta médica general',
      indicaciones: 'Asistir en ayunas'
    });
    await prestacion1.save();

    const prestacion2 = new Prestacion({
      nombre: 'Consulta General',
      descripcion: 'Consulta médica especializada',
      indicaciones: 'Asistir con resultados de exámenes'
    });

    try {
      await prestacion2.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.code).to.equal(11000); 
    }
  });
});