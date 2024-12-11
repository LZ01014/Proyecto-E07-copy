process.env.NODE_ENV = 'test';

const chai = require('chai');
const supertest = require('supertest');
const server = require('../../server'); // Asegúrate de que la ruta sea correcta
const Usuario = require('../../models/Usuario');
const jwt = require('jsonwebtoken');
const { expect } = chai;

const request = supertest(server);

describe('JWT Authentication', () => {
  let token;
  let adminToken;
  let testUserId;

  before(async () => {
    const usuario = new Usuario({
      nombre: 'Test',
      apellidos: 'User',
      username: 'testuser',
      password: 'Test1234',
      tipo: 'Paciente' 
    });
    const savedUser = await usuario.save();
    testUserId = savedUser._id; 

    // Crear un token de administrador para pruebas
    adminToken = jwt.sign({ id: 'adminuser', role: 'Administración' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  after(async () => {
    await Usuario.findByIdAndDelete(testUserId);
  });

  it('should generate a JWT token on successful login', (done) => {
    request
      .post('/api/login')
      .send({ username: 'testuser', password: 'Test1234' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('token');
        token = res.body.token;
        done();
      });
  });

  it('should verify the JWT token', (done) => {
    request
      .get('/api/check-auth')
      .set('Cookie', `token=${token}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('user');
        expect(res.body.user.username).to.equal('testuser');
        done();
      });
  });

  it('should return 401 for invalid JWT token', (done) => {
    request
      .get('/api/check-auth')
      .set('Cookie', 'token=invalidtoken')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should return 401 for expired JWT token', (done) => {
    const expiredToken = jwt.sign({ id: 'testuser' }, process.env.JWT_SECRET, { expiresIn: '1ms' });
    setTimeout(() => {
      request
        .get('/api/check-auth')
        .set('Cookie', `token=${expiredToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    }, 10);
  });

  it('should return 401 for missing JWT token', (done) => {
    request
      .get('/api/check-auth')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should return 401 for manipulated JWT token', (done) => {
    const manipulatedToken = token.split('.').slice(0, 2).join('.') + '.invalidsignature';
    request
      .get('/api/check-auth')
      .set('Cookie', `token=${manipulatedToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should allow access to /usuarios for admin role', (done) => {
    request
      .get('/api/usuarios')
      .set('Cookie', `token=${adminToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return 403 for non-admin role trying to access /usuarios', (done) => {
    const userToken = jwt.sign({ id: 'testuser', role: 'Paciente' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    request
      .get('/api/usuarios')
      .set('Cookie', `token=${userToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.have.property('message', 'Acceso denegado');
        done();
      });
  });

  it('should return 401 for JWT token with invalid signature', (done) => {
    const invalidSignatureToken = token.split('.').slice(0, 2).join('.') + '.invalidsignature';
    request
      .get('/api/check-auth')
      .set('Cookie', `token=${invalidSignatureToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('message', 'Token inválido o expirado');
        done();
      });
  });

  it('should return 401 for JWT token with wrong secret', (done) => {
    const wrongSecretToken = jwt.sign({ id: 'testuser' }, 'wrongsecret', { expiresIn: '1h' });
    request
      .get('/api/check-auth')
      .set('Cookie', `token=${wrongSecretToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('message', 'Token inválido o expirado');
        done();
      });
  });

  it('should return 401 for JWT token with missing fields', (done) => {
    const missingFieldsToken = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '1h' });
    request
      .get('/api/check-auth')
      .set('Cookie', `token=${missingFieldsToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('message', 'Token inválido o expirado');
        done();
      });
  });

  it('should return 401 for JWT token with invalid payload', (done) => {
    const invalidPayloadToken = jwt.sign({ id: 'invaliduser' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    request
      .get('/api/check-auth')
      .set('Cookie', `token=${invalidPayloadToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('message', 'Token inválido o expirado');
        done();
      });
  });

  it('should return 403 for valid JWT token with unauthorized role', (done) => {
    const unauthorizedRoleToken = jwt.sign({ id: 'testuser', role: 'UnauthorizedRole' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    request
      .get('/api/usuarios')
      .set('Cookie', `token=${unauthorizedRoleToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.have.property('message', 'Acceso denegado');
        done();
      });
  });
});