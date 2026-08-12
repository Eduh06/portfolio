const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app');
const { restoreDatabase } = require('../helpers/databaseSnapshot');

describe('API - Autenticação', () => {
  beforeEach(() => {
    restoreDatabase();
  });

  describe('POST /api/auth/register', () => {
    it('deve cadastrar um novo usuário com sucesso retornando 201', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'novo@usuario.com',
          password: 'senha_secreta'
        });

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id');
      expect(response.body.email).to.equal('novo@usuario.com');
      expect(response.body).to.not.have.property('password');
    });

    it('deve rejeitar e-mails inválidos (Bug C) retornando status 400', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'usuario_sem_arroba',
          password: 'senha_secreta'
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('erro');
      expect(response.body.erro).to.contain('Formato de e-mail inválido');
    });

    it('deve rejeitar e-mails duplicados (Bug A) retornando status 400', async () => {
      // Primeiro cadastro
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'dup@usuario.com',
          password: 'senha_secreta'
        });

      // Segundo cadastro com mesmo e-mail
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'dup@usuario.com',
          password: 'senha_secreta'
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('erro');
      expect(response.body.erro).to.contain('E-mail já cadastrado');
    });
  });

  describe('POST /api/auth/login', () => {
    it('deve realizar login com sucesso e retornar o token JWT', async () => {
      // Cadastra
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'login@usuario.com',
          password: 'senha_secreta'
        });

      // Login
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@usuario.com',
          password: 'senha_secreta'
        });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
      expect(response.body.user.email).to.equal('login@usuario.com');
    });

    it('deve rejeitar login com credenciais incorretas', async () => {
      // Cadastra
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'errado@usuario.com',
          password: 'senha_secreta'
        });

      // Login com senha errada
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'errado@usuario.com',
          password: 'senha_incorreta'
        });

      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('erro');
      expect(response.body.erro).to.contain('Credenciais inválidas');
    });
  });
});
