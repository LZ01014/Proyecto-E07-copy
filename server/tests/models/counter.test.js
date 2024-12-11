const chai = require('chai');
const mongoose = require('mongoose');
const Counter = require('../models/Counter');
const { expect } = chai;

describe('Counter Model', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  after(async () => {
    await Counter.deleteMany({});
    await mongoose.connection.close();
  });

  it('should create a valid counter', async () => {
    const counter = new Counter({
      model: 'Usuario',
      count: 1
    });

    const savedCounter = await counter.save();
    expect(savedCounter._id).to.exist;
    expect(savedCounter.model).to.equal('Usuario');
    expect(savedCounter.count).to.equal(1);
  });

  it('should not create a counter with short model', async () => {
    const counter = new Counter({
      model: 'U',
      count: 1
    });

    try {
      await counter.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.model).to.exist;
      expect(error.errors.model.message).to.equal('Model inválido. Debe tener entre 2 y 100 caracteres.');
    }
  });

  it('should not create a counter with long model', async () => {
    const counter = new Counter({
      model: 'a'.repeat(101),
      count: 1
    });

    try {
      await counter.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.model).to.exist;
      expect(error.errors.model.message).to.equal('Model inválido. Debe tener entre 2 y 100 caracteres.');
    }
  });

  it('should not create a counter with negative count', async () => {
    const counter = new Counter({
      model: 'Usuario',
      count: -1
    });

    try {
      await counter.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.count).to.exist;
      expect(error.errors.count.message).to.equal('Path `count` (-1) is less than minimum allowed value (0).');
    }
  });

  it('should not create a counter with non-integer count', async () => {
    const counter = new Counter({
      model: 'Usuario',
      count: 1.5
    });

    try {
      await counter.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.count).to.exist;
      expect(error.errors.count.message).to.equal('Count debe ser un número entero.');
    }
  });
});