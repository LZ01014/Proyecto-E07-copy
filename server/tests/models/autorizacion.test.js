process.env.NODE_ENV = 'test';

require('dotenv').config();
const chai = require('chai');
const mongoose = require('mongoose');
const Autorizacion = require('../../models/Autorizacion');
const { expect } = chai;

describe('Autorizacion Model', () => {
  before(async () => {
    const dbUri = process.env.MONGODB_TEST_URI;
    if (!dbUri) {
      throw new Error('MONGODB_TEST_URI no está definido');
    }
    await mongoose.connect(dbUri);
  });

  beforeEach(async () => {
    await Autorizacion.deleteMany({});
  });

  after(async () => {
    await Autorizacion.deleteMany({});
    await mongoose.connection.close();
  });

  it('should create a valid autorizacion', async () => {
    const autorizacion = new Autorizacion({
      prestacionId: new mongoose.Types.ObjectId(),
      pacienteId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId(),
      autorizado: true
    });

    const savedAutorizacion = await autorizacion.save();
    expect(savedAutorizacion._id).to.exist;
    expect(savedAutorizacion.autorizado).to.be.true;
  });

  it('should not create an autorizacion without prestacionId', async () => {
    const autorizacion = new Autorizacion({
      pacienteId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId(),
      autorizado: true
    });

    try {
      await autorizacion.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.prestacionId).to.exist;
      expect(error.errors.prestacionId.message).to.equal('El ID de la prestación es obligatorio.');
    }
  });

  it('should not create an autorizacion with invalid prestacionId', async () => {
    const autorizacion = new Autorizacion({
      prestacionId: 'invalid-id',
      pacienteId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId(),
      autorizado: true
    });

    try {
      await autorizacion.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.prestacionId).to.exist;
      expect(error.errors.prestacionId.message).to.equal('Cast to ObjectId failed for value "invalid-id" (type string) at path "prestacionId" because of "BSONError"');
    }
  });

  it('should not create an autorizacion without pacienteId', async () => {
    const autorizacion = new Autorizacion({
      prestacionId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId(),
      autorizado: true
    });

    try {
      await autorizacion.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.pacienteId).to.exist;
      expect(error.errors.pacienteId.message).to.equal('El ID del paciente es obligatorio.');
    }
  });

  it('should not create an autorizacion with invalid pacienteId', async () => {
    const autorizacion = new Autorizacion({
      prestacionId: new mongoose.Types.ObjectId(),
      pacienteId: 'invalid-id',
      citaId: new mongoose.Types.ObjectId(),
      autorizado: true
    });

    try {
      await autorizacion.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.pacienteId).to.exist;
      expect(error.errors.pacienteId.message).to.equal('Cast to ObjectId failed for value "invalid-id" (type string) at path "pacienteId" because of "BSONError"');
    }
  });

  it('should not create an autorizacion without citaId', async () => {
    const autorizacion = new Autorizacion({
      prestacionId: new mongoose.Types.ObjectId(),
      pacienteId: new mongoose.Types.ObjectId(),
      autorizado: true
    });

    try {
      await autorizacion.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.citaId).to.exist;
      expect(error.errors.citaId.message).to.equal('El ID de la cita es obligatorio.');
    }
  });

  it('should not create an autorizacion with invalid citaId', async () => {
    const autorizacion = new Autorizacion({
      prestacionId: new mongoose.Types.ObjectId(),
      pacienteId: new mongoose.Types.ObjectId(),
      citaId: 'invalid-id',
      autorizado: true
    });

    try {
      await autorizacion.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.citaId).to.exist;
      expect(error.errors.citaId.message).to.equal('Cast to ObjectId failed for value "invalid-id" (type string) at path "citaId" because of "BSONError"');
    }
  });

  it('should not create an autorizacion without autorizado', async () => {
    const autorizacion = new Autorizacion({
      prestacionId: new mongoose.Types.ObjectId(),
      pacienteId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId()
    });

    try {
      await autorizacion.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.autorizado).to.exist;
      expect(error.errors.autorizado.message).to.equal('El estado de autorización es obligatorio.');
    }
  });

  it('should create an autorizacion with autorizado set to false', async () => {
    const autorizacion = new Autorizacion({
      prestacionId: new mongoose.Types.ObjectId(),
      pacienteId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId(),
      autorizado: false
    });

    const savedAutorizacion = await autorizacion.save();
    expect(savedAutorizacion._id).to.exist;
    expect(savedAutorizacion.autorizado).to.be.false;
  });

  it('should create an autorizacion without autorizado (default to false)', async () => {
    const autorizacion = new Autorizacion({
      prestacionId: new mongoose.Types.ObjectId(),
      pacienteId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId()
    });

    const savedAutorizacion = await autorizacion.save();
    expect(savedAutorizacion._id).to.exist;
    expect(savedAutorizacion.autorizado).to.be.false;
  });

  it('should not create an autorizacion with duplicate prestacionId for the same pacienteId and citaId', async () => {
    const prestacionId = new mongoose.Types.ObjectId();
    const pacienteId = new mongoose.Types.ObjectId();
    const citaId = new mongoose.Types.ObjectId();

    const autorizacion1 = new Autorizacion({
      prestacionId,
      pacienteId,
      citaId,
      autorizado: true
    });
    await autorizacion1.save();

    const autorizacion2 = new Autorizacion({
      prestacionId,
      pacienteId,
      citaId,
      autorizado: false
    });

    try {
      await autorizacion2.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.message).to.equal('Ya existe una receta para este médico y paciente en la misma fecha y hora');
    }
  });
});