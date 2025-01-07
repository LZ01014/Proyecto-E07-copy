process.env.NODE_ENV = 'test';

require('dotenv').config();
const chai = require('chai');
const mongoose = require('mongoose');
const Receta = require('../../models/Receta');
const Usuario = require('../../models/Usuario');
const { expect } = chai;

describe('Receta Model', () => {
  let medicoId;
  let pacienteId;

  before(async () => {
    const dbUri = process.env.MONGODB_TEST_URI;
    if (!dbUri) {
      throw new Error('MONGODB_TEST_URI no está definido');
    }
    await mongoose.connect(dbUri);

    // Crear un médico y un paciente de prueba
    const medico = new Usuario({
      nombre: 'Medico',
      apellidos: 'Prueba',
      username: 'medicoprueba',
      password: 'Test1234',
      tipo: 'Médico',
      email: 'medico.prueba@example.com'
    });
    const savedMedico = await medico.save();
    medicoId = savedMedico._id;

    const paciente = new Usuario({
      nombre: 'Paciente',
      apellidos: 'Prueba',
      username: 'pacienteprueba',
      password: 'Test1234',
      tipo: 'Paciente',
      email: 'paciente.prueba@example.com'
    });
    const savedPaciente = await paciente.save();
    pacienteId = savedPaciente._id;
  });

  beforeEach(async () => {
    await Receta.deleteMany({});
  });

  after(async () => {
    await Usuario.deleteMany({});
    await Receta.deleteMany({});
    await mongoose.connection.close();
  });

  it('should create a valid receta', async () => {
    const receta = new Receta({
      medicoId,
      pacienteId,
      fecha: new Date(),
      hora: '10:00',
      medicamentos: 'Paracetamol',
      observaciones: 'Tomar cada 8 horas'
    });

    const savedReceta = await receta.save();
    expect(savedReceta._id).to.exist;
    expect(savedReceta.medicoId.toString()).to.equal(medicoId.toString());
    expect(savedReceta.pacienteId.toString()).to.equal(pacienteId.toString());
  });

  it('should not create a receta with invalid fecha', async () => {
    const receta = new Receta({
      medicoId,
      pacienteId,
      fecha: 'invalid-date',
      hora: '10:00',
      medicamentos: 'Paracetamol',
      observaciones: 'Tomar cada 8 horas'
    });

    try {
      await receta.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.fecha).to.exist;
      expect(error.errors.fecha.message).to.equal('Cast to date failed for value "invalid-date" (type string) at path "fecha"');
    }
  });

  it('should not create a receta with invalid hora', async () => {
    const receta = new Receta({
      medicoId,
      pacienteId,
      fecha: new Date(),
      hora: 'invalid-time',
      medicamentos: 'Paracetamol',
      observaciones: 'Tomar cada 8 horas'
    });

    try {
      await receta.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.hora).to.exist;
      expect(error.errors.hora.message).to.equal('Hora inválida. Debe estar en formato HH:MM.');
    }
  });

  it('should not create a receta with invalid medicamentos', async () => {
    const receta = new Receta({
      medicoId,
      pacienteId,
      fecha: new Date(),
      hora: '10:00',
      medicamentos: 'a',
      observaciones: 'Tomar cada 8 horas'
    });

    try {
      await receta.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.medicamentos).to.exist;
      expect(error.errors.medicamentos.message).to.equal('Medicamentos inválidos. Deben tener entre 1 y 500 caracteres.');
    }
  });

  it('should not create a receta with invalid observaciones', async () => {
    const receta = new Receta({
      medicoId,
      pacienteId,
      fecha: new Date(),
      hora: '10:00',
      medicamentos: 'Paracetamol',
      observaciones: 'a'.repeat(1001)
    });

    try {
      await receta.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.observaciones).to.exist;
      expect(error.errors.observaciones.message).to.equal('Observaciones inválidas. No deben exceder los 1000 caracteres.');
    }
  });

  it('should not create a receta with overlapping date and time', async () => {
    const receta1 = new Receta({
      medicoId,
      pacienteId,
      fecha: new Date(),
      hora: '10:00',
      medicamentos: 'Paracetamol',
      observaciones: 'Tomar cada 8 horas'
    });
    await receta1.save();

    const receta2 = new Receta({
      medicoId,
      pacienteId,
      fecha: receta1.fecha,
      hora: receta1.hora,
      medicamentos: 'Ibuprofeno',
      observaciones: 'Tomar cada 6 horas'
    });

    try {
      await receta2.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.message).to.equal('Ya existe una receta para este médico y paciente en la misma fecha y hora');
    }
  });

  it('should not create a receta without medicoId', async () => {
    const receta = new Receta({
      pacienteId,
      fecha: new Date(),
      hora: '10:00',
      medicamentos: 'Paracetamol',
      observaciones: 'Tomar cada 8 horas'
    });

    try {
      await receta.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.medicoId).to.exist;
      expect(error.errors.medicoId.message).to.equal('Path `medicoId` is required.');
    }
  });

  it('should not create a receta without pacienteId', async () => {
    const receta = new Receta({
      medicoId,
      fecha: new Date(),
      hora: '10:00',
      medicamentos: 'Paracetamol',
      observaciones: 'Tomar cada 8 horas'
    });

    try {
      await receta.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.pacienteId).to.exist;
      expect(error.errors.pacienteId.message).to.equal('Path `pacienteId` is required.');
    }
  });

  it('should not create a receta without fecha', async () => {
    const receta = new Receta({
      medicoId,
      pacienteId,
      hora: '10:00',
      medicamentos: 'Paracetamol',
      observaciones: 'Tomar cada 8 horas'
    });

    try {
      await receta.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.fecha).to.exist;
      expect(error.errors.fecha.message).to.equal('Path `fecha` is required.');
    }
  });

  it('should not create a receta without hora', async () => {
    const receta = new Receta({
      medicoId,
      pacienteId,
      fecha: new Date(),
      medicamentos: 'Paracetamol',
      observaciones: 'Tomar cada 8 horas'
    });

    try {
      await receta.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.hora).to.exist;
      expect(error.errors.hora.message).to.equal('Path `hora` is required.');
    }
  });

  it('should not create a receta without medicamentos', async () => {
    const receta = new Receta({
      medicoId,
      pacienteId,
      fecha: new Date(),
      hora: '10:00',
      observaciones: 'Tomar cada 8 horas'
    });

    try {
      await receta.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.medicamentos).to.exist;
      expect(error.errors.medicamentos.message).to.equal('Medicamentos inválidos. Se requiere este campo.');
    }
  });
});