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

  it('deve bloquear acesso a rota protegida (/api/ativos) sem token retornando status 401', async () => {
    const response = await request(app).get('/api/ativos');
    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('erro');
  });
});
