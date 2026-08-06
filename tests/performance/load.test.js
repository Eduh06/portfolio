import http from 'k6/http';
import { sleep, check } from 'k6';

// Configuração dos estágios de carga
export const options = {
  stages: [
    { duration: '10s', target: 5 },  // Rampa de subida: sobe de 0 para 5 usuários virtuais (VUs)
    { duration: '20s', target: 15 }, // Rampa de carga: sobe para 15 usuários virtuais e mantém a carga
    { duration: '10s', target: 0 },  // Cooldown: reduz a carga gradativamente para 0
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],   // Taxa de falhas de requisição HTTP deve ser menor que 1%
    http_req_duration: ['p(95)<200'], // 95% das requisições devem responder em menos de 200ms
  },
};

const BASE_URL = 'http://localhost:3000';

export default function () {
  // Cenário 1: Consultar dados consolidados do painel (GET)
  const painelRes = http.get(`${BASE_URL}/api/painel`);
  check(painelRes, {
    'status do painel é 200': (r) => r.status === 200,
    'tempo de resposta do painel < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(0.5); // Pequeno intervalo de 500ms antes da próxima ação

  // Cenário 2: Cadastrar um ativo (POST) para testar carga de escrita
  const payload = JSON.stringify({
    codigo: `PERF-${Math.floor(Math.random() * 100)}`,
    nome: 'Ativo de Performance',
    quantidade: 10,
    precoMedio: 15.50
  });

  const headers = { 'Content-Type': 'application/json' };
  const ativoRes = http.post(`${BASE_URL}/api/ativos`, payload, { headers });

  check(ativoRes, {
    'status do cadastro é 201': (r) => r.status === 201,
    'tempo de resposta do cadastro < 250ms': (r) => r.timings.duration < 250,
  });

  sleep(1); // Aguarda 1 segundo antes de repetir o fluxo
}
