const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app');
const { restoreDatabase } = require('../helpers/databaseSnapshot');

describe('API - Rendimentos e Aportes', () => {
  beforeEach(() => {
    restoreDatabase();
  });

  describe('POST /api/rendimentos', () => {
    it('deve registrar um rendimento válido retornando status 201', async () => {
      const response = await request(app)
        .post('/api/rendimentos')
        .send({
          mes: '2026-08',
          tipo: 'rendimento',
          valor: 150.75
        });

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id');
      expect(response.body.tipo).to.equal('rendimento');
      expect(response.body.valor).to.equal(150.75);
    });

    it('deve registrar um aporte válido retornando status 201', async () => {
      const response = await request(app)
        .post('/api/rendimentos')
        .send({
          mes: '2026-08',
          tipo: 'aporte',
          valor: 500.00
        });

      expect(response.status).to.equal(201);
      expect(response.body.tipo).to.equal('aporte');
      expect(response.body.valor).to.equal(500.00);
    });

    it('deve rejeitar registro com tipo inválido retornando status 400', async () => {
      const response = await request(app)
        .post('/api/rendimentos')
        .send({
          mes: '2026-08',
          tipo: 'saque',
          valor: 200.00
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
    });

    it('deve rejeitar registro com formato de mês inválido retornando status 400', async () => {
      const response = await request(app)
        .post('/api/rendimentos')
        .send({
          mes: '08-2026', // Formato incorreto (esperado AAAA-MM)
          tipo: 'aporte',
          valor: 200.00
        });

      expect(response.status).to.equal(400);
      expect(response.body.error).to.contain('Mês inválido');
    });
  });

  describe('GET /api/rendimentos', () => {
    it('deve listar todos os rendimentos e aportes cadastrados', async () => {
      await request(app)
        .post('/api/rendimentos')
        .send({
          mes: '2026-08',
          tipo: 'rendimento',
          valor: 150.00
        });

      const response = await request(app).get('/api/rendimentos');

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.equal(1);
      expect(response.body[0].tipo).to.equal('rendimento');
    });
  });
});
