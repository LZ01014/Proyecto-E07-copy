const chai = require('chai');
const mongoose = require('mongoose');
const Receta = require('../models/Receta');
const Usuario = require('../models/Usuario');
const { expect } = chai;

describe('Receta Model', () => {
  let medicoId;
  let pacienteId;

  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Crear un médico y un paciente de prueba
    const medico = new Usuario({
      nombre: 'Medico',
      apellidos: 'Prueba',
      username: 'medicoprueba',
      password: 'Test1234',
      tipo: 'Doctor',
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
      expect(error.errors.fecha.message).to.equal('Fecha inválida.');
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
      medicamentos: '',
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
});