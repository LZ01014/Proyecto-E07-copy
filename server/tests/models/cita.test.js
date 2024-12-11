const chai = require('chai');
const mongoose = require('mongoose');
const Cita = require('../models/Cita');
const Usuario = require('../models/Usuario');
const Departamento = require('../models/Departamento');
const Prestacion = require('../models/Prestacion');
const { expect } = chai;

describe('Cita Model', () => {
  let medicoId;
  let especialidadId;
  let prestacionId;
  let pacienteId;

  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

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

    const departamento = new Departamento({
      nombre: 'Cardiología',
      tipo: 'Especialidad médica'
    });
    const savedDepartamento = await departamento.save();
    especialidadId = savedDepartamento._id;

    const prestacion = new Prestacion({
      nombre: 'Consulta General',
      descripcion: 'Consulta médica general'
    });
    const savedPrestacion = await prestacion.save();
    prestacionId = savedPrestacion._id;

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
    await Departamento.deleteMany({});
    await Prestacion.deleteMany({});
    await Cita.deleteMany({});
    await mongoose.connection.close();
  });

  it('should create a valid cita', async () => {
    const cita = new Cita({
      medicoId,
      especialidadId,
      prestacionId,
      fecha: new Date(),
      hora: '10:00',
      duracion: 30,
      pacienteId
    });

    const savedCita = await cita.save();
    expect(savedCita._id).to.exist;
    expect(savedCita.medicoId.toString()).to.equal(medicoId.toString());
    expect(savedCita.especialidadId.toString()).to.equal(especialidadId.toString());
    expect(savedCita.prestacionId.toString()).to.equal(prestacionId.toString());
  });

  it('should not create a cita with invalid fecha', async () => {
    const cita = new Cita({
      medicoId,
      especialidadId,
      prestacionId,
      fecha: 'invalid-date',
      hora: '10:00',
      duracion: 30,
      pacienteId
    });

    try {
      await cita.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.fecha).to.exist;
      expect(error.errors.fecha.message).to.equal('Fecha inválida.');
    }
  });

  it('should not create a cita with invalid hora', async () => {
    const cita = new Cita({
      medicoId,
      especialidadId,
      prestacionId,
      fecha: new Date(),
      hora: 'invalid-time',
      duracion: 30,
      pacienteId
    });

    try {
      await cita.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.hora).to.exist;
      expect(error.errors.hora.message).to.equal('Hora inválida. Debe estar en formato HH:MM.');
    }
  });

  it('should not create a cita with non-integer duracion', async () => {
    const cita = new Cita({
      medicoId,
      especialidadId,
      prestacionId,
      fecha: new Date(),
      hora: '10:00',
      duracion: 30.5,
      pacienteId
    });

    try {
      await cita.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.duracion).to.exist;
      expect(error.errors.duracion.message).to.equal('Duración debe ser un número entero.');
    }
  });

  it('should not create a cita with overlapping date and time', async () => {
    const cita1 = new Cita({
      medicoId,
      especialidadId,
      prestacionId,
      fecha: new Date(),
      hora: '10:00',
      duracion: 30,
      pacienteId
    });
    await cita1.save();

    const cita2 = new Cita({
      medicoId,
      especialidadId,
      prestacionId,
      fecha: cita1.fecha,
      hora: cita1.hora,
      duracion: 30,
      pacienteId
    });

    try {
      await cita2.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.message).to.equal('Ya existe una cita para este médico en la misma fecha y hora');
    }
  });
});