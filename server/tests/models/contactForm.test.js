process.env.NODE_ENV = 'test';

require('dotenv').config();
const chai = require('chai');
const mongoose = require('mongoose');
const ContactForm = require('../../models/ContactForms');
const { expect } = chai;

describe('ContactForm Model', () => {
  before(async () => {
    const dbUri = process.env.MONGODB_TEST_URI;
    if (!dbUri) {
      throw new Error('MONGODB_TEST_URI no está definido');
    }
    await mongoose.connect(dbUri);
  });

  after(async () => {
    await ContactForm.deleteMany({});
    await mongoose.connection.close();
  });

  it('should create a valid contact form', async () => {
    const contactForm = new ContactForm({
      nombre: 'Juan Pérez',
      correo: 'juan.perez@example.com',
      asunto: 'Consulta sobre servicios',
      mensaje: 'Me gustaría saber más sobre los servicios que ofrecen.'
    });

    const savedContactForm = await contactForm.save();
    expect(savedContactForm._id).to.exist;
    expect(savedContactForm.nombre).to.equal('Juan Pérez');
  });

  it('should not create a contact form with invalid correo', async () => {
    const contactForm = new ContactForm({
      nombre: 'Juan Pérez',
      correo: 'invalid-email',
      asunto: 'Consulta sobre servicios',
      mensaje: 'Me gustaría saber más sobre los servicios que ofrecen.'
    });

    try {
      await contactForm.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.correo).to.exist;
      expect(error.errors.correo.message).to.equal('Correo inválido.');
    }
  });

  it('should not create a contact form with short asunto', async () => {
    const contactForm = new ContactForm({
      nombre: 'Juan Pérez',
      correo: 'juan.perez@example.com',
      asunto: 'Hi',
      mensaje: 'Me gustaría saber más sobre los servicios que ofrecen.'
    });

    try {
      await contactForm.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.asunto).to.exist;
      expect(error.errors.asunto.message).to.equal('Asunto inválido. Debe tener entre 5 y 100 caracteres.');
    }
  });

  it('should not create a contact form with long mensaje', async () => {
    const contactForm = new ContactForm({
      nombre: 'Juan Pérez',
      correo: 'juan.perez@example.com',
      asunto: 'Consulta sobre servicios',
      mensaje: 'a'.repeat(1001)
    });

    try {
      await contactForm.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.mensaje).to.exist;
      expect(error.errors.mensaje.message).to.equal('Mensaje inválido. Debe tener entre 10 y 1000 caracteres.');
    }
  });

  it('should not create a contact form with invalid nombre', async () => {
    const contactForm = new ContactForm({
      nombre: 'Juan123',
      correo: 'juan.perez@example.com',
      asunto: 'Consulta sobre servicios',
      mensaje: 'Me gustaría saber más sobre los servicios que ofrecen.'
    });

    try {
      await contactForm.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.nombre).to.exist;
      expect(error.errors.nombre.message).to.equal('Nombre inválido. Solo se permiten letras y espacios.');
    }
  });

  it('should not create a contact form without nombre', async () => {
    const contactForm = new ContactForm({
      correo: 'juan.perez@example.com',
      asunto: 'Consulta sobre servicios',
      mensaje: 'Me gustaría saber más sobre los servicios que ofrecen.'
    });

    try {
      await contactForm.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.nombre).to.exist;
      expect(error.errors.nombre.message).to.equal('Path `nombre` is required.');
    }
  });

  it('should not create a contact form without correo', async () => {
    const contactForm = new ContactForm({
      nombre: 'Juan Pérez',
      asunto: 'Consulta sobre servicios',
      mensaje: 'Me gustaría saber más sobre los servicios que ofrecen.'
    });

    try {
      await contactForm.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.correo).to.exist;
      expect(error.errors.correo.message).to.equal('Path `correo` is required.');
    }
  });

  it('should not create a contact form without asunto', async () => {
    const contactForm = new ContactForm({
      nombre: 'Juan Pérez',
      correo: 'juan.perez@example.com',
      mensaje: 'Me gustaría saber más sobre los servicios que ofrecen.'
    });

    try {
      await contactForm.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.asunto).to.exist;
      expect(error.errors.asunto.message).to.equal('Path `asunto` is required.');
    }
  });

  it('should not create a contact form without mensaje', async () => {
    const contactForm = new ContactForm({
      nombre: 'Juan Pérez',
      correo: 'juan.perez@example.com',
      asunto: 'Consulta sobre servicios'
    });

    try {
      await contactForm.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.mensaje).to.exist;
      expect(error.errors.mensaje.message).to.equal('Path `mensaje` is required.');
    }
  });
});