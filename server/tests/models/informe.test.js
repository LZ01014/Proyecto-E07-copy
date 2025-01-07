process.env.NODE_ENV = 'test';

require('dotenv').config();
const chai = require('chai');
const mongoose = require('mongoose');
const Informe = require('../../models/Informe');
const { expect } = chai;

describe('Informe Model', () => {
  before(async () => {
    const dbUri = process.env.MONGODB_TEST_URI;
    if (!dbUri) {
      throw new Error('MONGODB_TEST_URI no está definido');
    }
    await mongoose.connect(dbUri);
  });

  beforeEach(async () => {
    await Informe.deleteMany({});
  });

  after(async () => {
    await Informe.deleteMany({});
    await mongoose.connection.close();
  });

  it('should create a valid informe', async () => {
    const informe = new Informe({
      medicoId: new mongoose.Types.ObjectId(),
      pacienteId: new mongoose.Types.ObjectId(),
      especialidadId: new mongoose.Types.ObjectId(),
      prestacionId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId(),
      fecha: new Date(),
      diagnostico: 'Diagnóstico válido',
      observaciones: 'Observaciones válidas'
    });

    const savedInforme = await informe.save();
    expect(savedInforme._id).to.exist;
    expect(savedInforme.diagnostico).to.equal('Diagnóstico válido');
  });

  it('should not create an informe without medicoId', async () => {
    const informe = new Informe({
      pacienteId: new mongoose.Types.ObjectId(),
      especialidadId: new mongoose.Types.ObjectId(),
      prestacionId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId(),
      fecha: new Date(),
      diagnostico: 'Diagnóstico válido',
      observaciones: 'Observaciones válidas'
    });

    try {
      await informe.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.medicoId).to.exist;
      expect(error.errors.medicoId.message).to.equal('El ID del médico es obligatorio.');
    }
  });

  it('should not create an informe with invalid medicoId', async () => {
    const informe = new Informe({
      medicoId: 'invalid-id',
      pacienteId: new mongoose.Types.ObjectId(),
      especialidadId: new mongoose.Types.ObjectId(),
      prestacionId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId(),
      fecha: new Date(),
      diagnostico: 'Diagnóstico válido',
      observaciones: 'Observaciones válidas'
    });

    try {
      await informe.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.medicoId).to.exist;
      expect(error.errors.medicoId.message).to.equal('Cast to ObjectId failed for value "invalid-id" (type string) at path "medicoId" because of "BSONError"');
    }
  });

  it('should not create an informe without pacienteId', async () => {
    const informe = new Informe({
      medicoId: new mongoose.Types.ObjectId(),
      especialidadId: new mongoose.Types.ObjectId(),
      prestacionId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId(),
      fecha: new Date(),
      diagnostico: 'Diagnóstico válido',
      observaciones: 'Observaciones válidas'
    });

    try {
      await informe.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.pacienteId).to.exist;
      expect(error.errors.pacienteId.message).to.equal('El ID del paciente es obligatorio.');
    }
  });

  it('should not create an informe with invalid pacienteId', async () => {
    const informe = new Informe({
      medicoId: new mongoose.Types.ObjectId(),
      pacienteId: 'invalid-id',
      especialidadId: new mongoose.Types.ObjectId(),
      prestacionId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId(),
      fecha: new Date(),
      diagnostico: 'Diagnóstico válido',
      observaciones: 'Observaciones válidas'
    });

    try {
      await informe.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.pacienteId).to.exist;
      expect(error.errors.pacienteId.message).to.equal('Cast to ObjectId failed for value "invalid-id" (type string) at path "pacienteId" because of "BSONError"');
    }
  });

  it('should not create an informe without especialidadId', async () => {
    const informe = new Informe({
      medicoId: new mongoose.Types.ObjectId(),
      pacienteId: new mongoose.Types.ObjectId(),
      prestacionId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId(),
      fecha: new Date(),
      diagnostico: 'Diagnóstico válido',
      observaciones: 'Observaciones válidas'
    });

    try {
      await informe.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.especialidadId).to.exist;
      expect(error.errors.especialidadId.message).to.equal('El ID de la especialidad es obligatorio.');
    }
  });

  it('should not create an informe with invalid especialidadId', async () => {
    const informe = new Informe({
      medicoId: new mongoose.Types.ObjectId(),
      pacienteId: new mongoose.Types.ObjectId(),
      especialidadId: 'invalid-id',
      prestacionId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId(),
      fecha: new Date(),
      diagnostico: 'Diagnóstico válido',
      observaciones: 'Observaciones válidas'
    });

    try {
      await informe.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.especialidadId).to.exist;
      expect(error.errors.especialidadId.message).to.equal('Cast to ObjectId failed for value "invalid-id" (type string) at path "especialidadId" because of "BSONError"');
    }
  });

  it('should not create an informe without prestacionId', async () => {
    const informe = new Informe({
      medicoId: new mongoose.Types.ObjectId(),
      pacienteId: new mongoose.Types.ObjectId(),
      especialidadId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId(),
      fecha: new Date(),
      diagnostico: 'Diagnóstico válido',
      observaciones: 'Observaciones válidas'
    });

    try {
      await informe.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.prestacionId).to.exist;
      expect(error.errors.prestacionId.message).to.equal('El ID de la prestación es obligatorio.');
    }
  });

  it('should not create an informe with invalid prestacionId', async () => {
    const informe = new Informe({
      medicoId: new mongoose.Types.ObjectId(),
      pacienteId: new mongoose.Types.ObjectId(),
      especialidadId: new mongoose.Types.ObjectId(),
      prestacionId: 'invalid-id',
      citaId: new mongoose.Types.ObjectId(),
      fecha: new Date(),
      diagnostico: 'Diagnóstico válido',
      observaciones: 'Observaciones válidas'
    });

    try {
      await informe.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.prestacionId).to.exist;
      expect(error.errors.prestacionId.message).to.equal('Cast to ObjectId failed for value "invalid-id" (type string) at path "prestacionId" because of "BSONError"');
    }
  });

  it('should not create an informe without citaId', async () => {
    const informe = new Informe({
      medicoId: new mongoose.Types.ObjectId(),
      pacienteId: new mongoose.Types.ObjectId(),
      especialidadId: new mongoose.Types.ObjectId(),
      prestacionId: new mongoose.Types.ObjectId(),
      fecha: new Date(),
      diagnostico: 'Diagnóstico válido',
      observaciones: 'Observaciones válidas'
    });

    try {
      await informe.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.citaId).to.exist;
      expect(error.errors.citaId.message).to.equal('El ID de la cita es obligatorio.');
    }
  });

  it('should not create an informe with invalid citaId', async () => {
    const informe = new Informe({
      medicoId: new mongoose.Types.ObjectId(),
      pacienteId: new mongoose.Types.ObjectId(),
      especialidadId: new mongoose.Types.ObjectId(),
      prestacionId: new mongoose.Types.ObjectId(),
      citaId: 'invalid-id',
      fecha: new Date(),
      diagnostico: 'Diagnóstico válido',
      observaciones: 'Observaciones válidas'
    });

    try {
      await informe.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.citaId).to.exist;
      expect(error.errors.citaId.message).to.equal('Cast to ObjectId failed for value "invalid-id" (type string) at path "citaId" because of "BSONError"');
    }
  });

  it('should not create an informe without fecha', async () => {
    const informe = new Informe({
      medicoId: new mongoose.Types.ObjectId(),
      pacienteId: new mongoose.Types.ObjectId(),
      especialidadId: new mongoose.Types.ObjectId(),
      prestacionId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId(),
      diagnostico: 'Diagnóstico válido',
      observaciones: 'Observaciones válidas'
    });

    try {
      await informe.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.fecha).to.exist;
      expect(error.errors.fecha.message).to.equal('La fecha es obligatoria.');
    }
  });

  it('should not create an informe with invalid fecha', async () => {
    const informe = new Informe({
      medicoId: new mongoose.Types.ObjectId(),
      pacienteId: new mongoose.Types.ObjectId(),
      especialidadId: new mongoose.Types.ObjectId(),
      prestacionId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId(),
      fecha: 'invalid-date',
      diagnostico: 'Diagnóstico válido',
      observaciones: 'Observaciones válidas'
    });

    try {
      await informe.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.fecha).to.exist;
      expect(error.errors.fecha.message).to.equal('Cast to date failed for value "invalid-date" (type string) at path "fecha"');
    }
  });

  it('should not create an informe without diagnostico', async () => {
    const informe = new Informe({
      medicoId: new mongoose.Types.ObjectId(),
      pacienteId: new mongoose.Types.ObjectId(),
      especialidadId: new mongoose.Types.ObjectId(),
      prestacionId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId(),
      fecha: new Date(),
      observaciones: 'Observaciones válidas'
    });

    try {
      await informe.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.diagnostico).to.exist;
      expect(error.errors.diagnostico.message).to.equal('El diagnóstico es obligatorio.');
    }
  });

  it('should not create an informe with diagnostico exceeding 1000 characters', async () => {
    const informe = new Informe({
      medicoId: new mongoose.Types.ObjectId(),
      pacienteId: new mongoose.Types.ObjectId(),
      especialidadId: new mongoose.Types.ObjectId(),
      prestacionId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId(),
      fecha: new Date(),
      diagnostico: 'a'.repeat(1001),
      observaciones: 'Observaciones válidas'
    });

    try {
      await informe.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.diagnostico).to.exist;
      expect(error.errors.diagnostico.message).to.equal('El diagnóstico debe tener entre 1 y 1000 caracteres.');
    }
  });

  it('should not create an informe with observaciones exceeding 1000 characters', async () => {
    const informe = new Informe({
      medicoId: new mongoose.Types.ObjectId(),
      pacienteId: new mongoose.Types.ObjectId(),
      especialidadId: new mongoose.Types.ObjectId(),
      prestacionId: new mongoose.Types.ObjectId(),
      citaId: new mongoose.Types.ObjectId(),
      fecha: new Date(),
      diagnostico: 'Diagnóstico válido',
      observaciones: 'a'.repeat(1001)
    });

    try {
      await informe.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.observaciones).to.exist;
      expect(error.errors.observaciones.message).to.equal('Las observaciones no deben exceder los 1000 caracteres.');
    }
  });
});