process.env.NODE_ENV = 'test';

require('dotenv').config();
const chai = require('chai');
const mongoose = require('mongoose');
const Aseguradora = require('../../models/Aseguradora');
const Departamento = require('../../models/Departamento');
const Prestacion = require('../../models/Prestacion');
const { expect } = chai;

describe('Aseguradora Model', () => {
  before(async () => {
    const dbUri = process.env.MONGODB_TEST_URI;
    if (!dbUri) {
      throw new Error('MONGODB_TEST_URI no está definido');
    }
    await mongoose.connect(dbUri);
  });

  beforeEach(async () => {
    await Aseguradora.deleteMany({});
  });

  after(async () => {
    await Aseguradora.deleteMany({});
    await mongoose.connection.close();
  });

  it('should create a valid aseguradora', async () => {
    const aseguradora = new Aseguradora({
      nombre: 'Aseguradora Salud',
      cobertura: [
        {
          especialidad: new mongoose.Types.ObjectId(),
          prestacion: new mongoose.Types.ObjectId(),
          tarifa: '100',
          foto: 'https://example.com/foto.jpg',
        },
      ],
    });

    const savedAseguradora = await aseguradora.save();
    expect(savedAseguradora._id).to.exist;
    expect(savedAseguradora.nombre).to.equal('Aseguradora Salud');
  });

  it('should not create an aseguradora without nombre', async () => {
    const aseguradora = new Aseguradora({
      cobertura: [
        {
          especialidad: new mongoose.Types.ObjectId(),
          prestacion: new mongoose.Types.ObjectId(),
          tarifa: '100',
          foto: 'https://example.com/foto.jpg',
        },
      ],
    });

    try {
      await aseguradora.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.nombre).to.exist;
      expect(error.errors.nombre.message).to.equal('El nombre de la aseguradora es obligatorio.');
    }
  });

  it('should not create an aseguradora with invalid tarifa', async () => {
    const aseguradora = new Aseguradora({
      nombre: 'Aseguradora Salud',
      cobertura: [
        {
          especialidad: new mongoose.Types.ObjectId(),
          prestacion: new mongoose.Types.ObjectId(),
          tarifa: 'invalid-tarifa',
          foto: 'https://example.com/foto.jpg',
        },
      ],
    });

    try {
      await aseguradora.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors['cobertura.0.tarifa']).to.exist;
      expect(error.errors['cobertura.0.tarifa'].message).to.equal('La tarifa debe contener solo dígitos numéricos.');
    }
  });

  it('should create an aseguradora without cobertura', async () => {
    const aseguradora = new Aseguradora({
      nombre: 'Aseguradora Salud',
    });

    const savedAseguradora = await aseguradora.save();
    expect(savedAseguradora._id).to.exist;
    expect(savedAseguradora.nombre).to.equal('Aseguradora Salud');
    expect(savedAseguradora.cobertura).to.be.an('array').that.is.empty;
  });

  it('should create an aseguradora with null foto in cobertura', async () => {
    const aseguradora = new Aseguradora({
      nombre: 'Aseguradora Salud',
      cobertura: [
        {
          especialidad: new mongoose.Types.ObjectId(),
          prestacion: new mongoose.Types.ObjectId(),
          tarifa: '100',
          foto: null,
        },
      ],
    });

    const savedAseguradora = await aseguradora.save();
    expect(savedAseguradora._id).to.exist;
    expect(savedAseguradora.nombre).to.equal('Aseguradora Salud');
    expect(savedAseguradora.cobertura[0].foto).to.be.null;
  });

  // Nuevos tests

  it('should not create an aseguradora with cobertura without especialidad and prestacion', async () => {
    const aseguradora = new Aseguradora({
      nombre: 'Aseguradora Salud',
      cobertura: [
        {
          tarifa: '100',
          foto: 'https://example.com/foto.jpg',
        },
      ],
    });

    try {
      await aseguradora.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors['cobertura.0.especialidad']).to.exist;
      expect(error.errors['cobertura.0.prestacion']).to.exist;
    }
  });

  it('should create an aseguradora with multiple coberturas', async () => {
    const aseguradora = new Aseguradora({
      nombre: 'Aseguradora Salud',
      cobertura: [
        {
          especialidad: new mongoose.Types.ObjectId(),
          prestacion: new mongoose.Types.ObjectId(),
          tarifa: '100',
          foto: 'https://example.com/foto1.jpg',
        },
        {
          especialidad: new mongoose.Types.ObjectId(),
          prestacion: new mongoose.Types.ObjectId(),
          tarifa: '200',
          foto: 'https://example.com/foto2.jpg',
        },
      ],
    });

    const savedAseguradora = await aseguradora.save();
    expect(savedAseguradora._id).to.exist;
    expect(savedAseguradora.nombre).to.equal('Aseguradora Salud');
    expect(savedAseguradora.cobertura).to.have.lengthOf(2);
  });
});