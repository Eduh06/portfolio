const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app');
const { restoreDatabase } = require('../helpers/databaseSnapshot');

describe('API - Painel', () => {
  let token;

  beforeEach(async () => {
    restoreDatabase();

    // Cadastra e autentica o usuário de teste
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    token = loginRes.body.token;
  });

  it('deve retornar métricas zeradas quando não houver dados cadastrados', async () => {
    const response = await request(app)
      .get('/api/painel')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(200);
    expect(response.body.totalInvestido).to.equal(0);
    expect(response.body.totalRendimentos).to.equal(0);
    expect(response.body.totalAportes).to.equal(0);
    expect(response.body.totalAcumulado).to.equal(0);
    expect(response.body.porcentagemRendimento).to.equal(0);
  });

  it('deve calcular corretamente o total investido, acumulado e porcentagem de rendimento', async () => {
    // 1. Cadastra ativo (MXRF11) -> 100 cotas a R$ 10,00 = R$ 1000,00 investido
    await request(app)
      .post('/api/ativos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        codigo: 'MXRF11',
        nome: 'Maxi Renda FII',
        quantidade: 100,
        precoMedio: 10.00
      });

    // 2. Registra rendimento de R$ 100,00
    await request(app)
      .post('/api/rendimentos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        mes: '2026-08',
        tipo: 'rendimento',
        valor: 100.00
      });

    // 3. Registra aporte de R$ 500,00
    await request(app)
      .post('/api/rendimentos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        mes: '2026-08',
        tipo: 'aporte',
        valor: 500.00
      });

    // 4. Consulta o Painel
    const response = await request(app)
      .get('/api/painel')
      .set('Authorization', `Bearer ${token}`);

    // Total Investido = 100 * 10 = R$ 1000
    // Total Rendimentos = R$ 100
    // Total Aportes = R$ 500
    // Total Acumulado = 1000 + 100 = R$ 1100
    // Porcentagem de Rendimento = (100 / 1000) * 100 = 10%
    expect(response.status).to.equal(200);
    expect(response.body.totalInvestido).to.equal(1000);
    expect(response.body.totalRendimentos).to.equal(100);
    expect(response.body.totalAportes).to.equal(500);
    expect(response.body.totalAcumulado).to.equal(1100);
    expect(response.body.porcentagemRendimento).to.equal(10);
  });
});
