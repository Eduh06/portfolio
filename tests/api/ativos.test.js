const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app');
const { restoreDatabase } = require('../helpers/databaseSnapshot');

describe('API - Ativos', () => {
  beforeEach(() => {
    restoreDatabase();
  });

  describe('POST /api/ativos', () => {
    it('deve cadastrar um ativo válido retornando status 201', async () => {
      const response = await request(app)
        .post('/api/ativos')
        .send({
          codigo: 'MXRF11',
          nome: 'Maxi Renda FII',
          quantidade: 100,
          precoMedio: 10.50
        });

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id');
      expect(response.body.codigo).to.equal('MXRF11');
      expect(response.body.quantidade).to.equal(100);
    });

    it('deve retornar status 400 em caso de payload inválido', async () => {
      const response = await request(app)
        .post('/api/ativos')
        .send({
          codigo: '',
          nome: 'Maxi Renda FII',
          quantidade: -10,
          precoMedio: 10.50
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });
  });

  describe('GET /api/ativos', () => {
    it('deve listar todos os ativos cadastrados', async () => {
      // Cadastra primeiro
      await request(app)
        .post('/api/ativos')
        .send({
          codigo: 'MXRF11',
          nome: 'Maxi Renda FII',
          quantidade: 100,
          precoMedio: 10.50
        });

      const response = await request(app).get('/api/ativos');

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.equal(1);
      expect(response.body[0].codigo).to.equal('MXRF11');
    });
  });
});
