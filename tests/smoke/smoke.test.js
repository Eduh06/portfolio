// Testes de fumaça para validar a disponibilidade básica do servidor e Swagger
const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app');

describe('Smoke - Aplicação', () => {
  it('deve redirecionar a rota raiz (/) para /api-docs', async () => {
    const response = await request(app).get('/');
    expect(response.status).to.equal(302);
    expect(response.headers.location).to.equal('/api-docs');
  });

  it('deve carregar a página da documentação Swagger (/api-docs/)', async () => {
    const response = await request(app).get('/api-docs/');
    expect(response.status).to.equal(200);
    expect(response.text).to.contain('<html');
  });
});
