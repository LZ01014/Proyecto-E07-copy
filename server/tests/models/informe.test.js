process.env.NODE_ENV = 'test';

require('dotenv').config();
const mongoose = require('mongoose');
const Informe = require('../../models/Informe');

(async () => {
  const chai = await import('chai');
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
        expect(error
