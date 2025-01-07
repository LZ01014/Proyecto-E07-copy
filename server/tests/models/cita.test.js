process.env.NODE_ENV = 'test';

require('dotenv').config();
const chai = require('chai');
const mongoose = require('mongoose');
const Cita = require('../../models/Cita');
const Usuario = require('../../models/Usuario');
const Departamento = require('../../models/Departamento');
const Prestacion = require('../../models/Prestacion');
const { expect } = chai;

describe('Cita Model', () => {
  let medicoId;
  let especialidadId;
  let prestacionId;
  let pacienteId;

  before(async function() {
    try {
      const dbUri = process.env.MONGODB_TEST_URI;
      if (!dbUri) {
        throw new Error('MONGODB_TEST_URI no está definido');
      }
      await mongoose.connect(dbUri);

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
    } catch (error) {
      console.error('Error en el hook before:', error);
      throw error;
    }
  });

  after(async () => {
    try {
      await Usuario.deleteMany({});
      await Departamento.deleteMany({});
      await Prestacion.deleteMany({});
      await Cita.deleteMany({});
      await mongoose.connection.close();
    } catch (error) {
      console.error('Error en el hook after:', error);
      throw error;
    }
  });

  it('should create a valid cita', async () => {
    const cita = new Cita({
      medicoId,
      especialidadId,
      prestacionId,
      fechaHora: new Date(),
      duracion: 30,
      pacienteId
    });

    const savedCita = await cita.save();
    expect(savedCita._id).to.exist;
    expect(savedCita.medicoId.toString()).to.equal(medicoId.toString());
    expect(savedCita.especialidadId.toString()).to.equal(especialidadId.toString());
    expect(savedCita.prestacionId.toString()).to.equal(prestacionId.toString());
    expect(savedCita.pacienteId.toString()).to.equal(pacienteId.toString());
  });

  it('should not create a cita with invalid fechaHora', async () => {
    const cita = new Cita({
      medicoId,
      especialidadId,
      prestacionId,
      fechaHora: 'invalid-date',
      duracion: 30,
      pacienteId
    });

    try {
      await cita.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.fechaHora).to.exist;
      expect(error.errors.fechaHora.message).to.equal('Cast to date failed for value "invalid-date" (type string) at path "fechaHora"');
    }
  });

  it('should not create a cita with non-integer duracion', async () => {
    const cita = new Cita({
      medicoId,
      especialidadId,
      prestacionId,
      fechaHora: new Date(),
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
    const fechaHora = new Date();

    const cita1 = new Cita({
      medicoId,
      especialidadId,
      prestacionId,
      fechaHora,
      duracion: 30,
      pacienteId
    });
    await cita1.save();

    const cita2 = new Cita({
      medicoId,
      especialidadId,
      prestacionId,
      fechaHora,
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

  it('should not create a cita without required fields', async () => {
    const cita = new Cita({
      especialidadId,
      prestacionId,
      fechaHora: new Date(),
      duracion: 30
    });

    try {
      await cita.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.medicoId).to.exist;
      expect(error.errors.medicoId.message).to.equal('Path `medicoId` is required.');
    }
  });

  it('should update a cita successfully', async () => {
    const cita = new Cita({
      medicoId,
      especialidadId,
      prestacionId,
      fechaHora: new Date(),
      duracion: 30,
      pacienteId
    });

    const savedCita = await cita.save();
    savedCita.duracion = 45;
    const updatedCita = await savedCita.save();

    expect(updatedCita.duracion).to.equal(45);
  });

  it('should delete a cita successfully', async () => {
    const cita = new Cita({
      medicoId,
      especialidadId,
      prestacionId,
      fechaHora: new Date(),
      duracion: 30,
      pacienteId
    });

    const savedCita = await cita.save();
    await Cita.findByIdAndDelete(savedCita._id);

    const deletedCita = await Cita.findById(savedCita._id);
    expect(deletedCita).to.be.null;
  });

  it('should not create a cita with duracion less than 1 minute', async () => {
    const cita = new Cita({
      medicoId,
      especialidadId,
      prestacionId,
      fechaHora: new Date(),
      duracion: 0,
      pacienteId
    });

    try {
      await cita.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.duracion).to.exist;
      expect(error.errors.duracion.message).to.equal('Path `duracion` (0) is less than minimum allowed value (1).');
    }
  });

  it('should not create a cita without prestacionId', async () => {
    const cita = new Cita({
      medicoId,
      especialidadId,
      fechaHora: new Date(),
      duracion: 30,
      pacienteId
    });

    try {
      await cita.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.prestacionId).to.exist;
      expect(error.errors.prestacionId.message).to.equal('Path `prestacionId` is required.');
    }
  });

  it('should not create a cita without especialidadId', async () => {
    const cita = new Cita({
      medicoId,
      prestacionId,
      fechaHora: new Date(),
      duracion: 30,
      pacienteId
    });

    try {
      await cita.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.especialidadId).to.exist;
      expect(error.errors.especialidadId.message).to.equal('Path `especialidadId` is required.');
    }
  });

  it('should not create a cita without fechaHora', async () => {
    const cita = new Cita({
      medicoId,
      especialidadId,
      prestacionId,
      duracion: 30,
      pacienteId
    });

    try {
      await cita.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.fechaHora).to.exist;
      expect(error.errors.fechaHora.message).to.equal('Path `fechaHora` is required.');
    }
  });
});