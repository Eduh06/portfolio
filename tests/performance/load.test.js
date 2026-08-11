import http from 'k6/http';
import { sleep, check } from 'k6';
// Importação da biblioteca de relatórios gráficos do k6 compatível com o parser
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.cjs';

// Configuração dos estágios de carga
export const options = {
  stages: [
    { duration: '10s', target: 5 },  // Rampa de subida
    { duration: '20s', target: 15 }, // Platô de carga
    { duration: '10s', target: 0 },  // Cooldown
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],   // Falhas < 1%
    http_req_duration: ['p(95)<1000'], // 95% das requisições < 1000ms (1s)
  },
};

const BASE_URL = 'http://localhost:3000';

// A função setup roda uma única vez no início do teste de performance
export function setup() {
  const userPayload = JSON.stringify({
    email: 'perf-user@example.com',
    password: 'password123'
  });
  
  const headers = { 'Content-Type': 'application/json' };

  // Registra o usuário de performance
  http.post(`${BASE_URL}/api/auth/register`, userPayload, { headers });

  // Faz login para obter o token JWT
  const loginRes = http.post(`${BASE_URL}/api/auth/login`, userPayload, { headers });
  
  // Extrai o token
  const token = loginRes.json().token;
  return token;
}

// O token retornado pelo setup é passado como argumento para cada VU
export default function (token) {
  const headers = { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // Cenário 1: GET /api/painel
  const painelRes = http.get(`${BASE_URL}/api/painel`, { headers });
  check(painelRes, {
    'status do painel é 200': (r) => r.status === 200,
    'tempo de resposta do painel < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(0.5);

  // Cenário 2: POST /api/ativos
  const payload = JSON.stringify({
    codigo: `PERF-${Math.floor(Math.random() * 100)}`,
    nome: 'Ativo de Performance',
    quantidade: 10,
    precoMedio: 15.50
  });

  const ativoRes = http.post(`${BASE_URL}/api/ativos`, payload, { headers });

  check(ativoRes, {
    'status do cadastro é 201': (r) => r.status === 201,
    'tempo de resposta do cadastro < 250ms': (r) => r.timings.duration < 250,
  });

  sleep(1);
}

// Função do k6 para gerar o sumário em formato HTML ao final da execução
export function handleSummary(data) {
  return {
    'mochawesome-report/api/performance.html': htmlReport(data),
  };
}
