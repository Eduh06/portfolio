# 10. Testes de Performance (k6)

Esta página documenta a estratégia, estrutura e execução dos testes de performance (carga e estresse) implementados para a API de Metas e Aportes utilizando a ferramenta **k6** (Grafana).

---

## ⚡ Estratégia de Teste de Carga

O teste de performance simula acessos simultâneos de usuários à API local para avaliar sua estabilidade, consumo de recursos e tempo de resposta. O teste está configurado no arquivo [load.test.js](file:///c:/Users/EduardodosSantos/projetos/portfolio/tests/performance/load.test.js).

### 📈 Cenário de Carga (Estágios)
O teste simula o seguinte fluxo de tráfego concorrente:
1. **Rampa de Subida (Warm-up)**: Sobe de 0 para 5 usuários virtuais (VUs) simultâneos em 10 segundos.
2. **Platô de Carga**: Eleva para 15 usuários virtuais simultâneos e mantém essa carga de forma constante por 20 segundos.
3. **Rampa de Descida (Cooldown)**: Reduz gradualmente de 15 para 0 usuários simultâneos em 10 segundos.

---

## 🛡️ Critérios de Aceitação de Performance (Thresholds)

Para que a API seja considerada aprovada em performance, ela deve atender aos seguintes limites:
- **Taxa de Erros (`http_req_failed`)**: Menos de 1% das requisições HTTP podem falhar (taxa < 0.01).
- **Tempo de Resposta P95 (`http_req_duration`)**: 95% das requisições devem responder em menos de 200 milissegundos.

---

## 📍 Fluxo de Teste Executado por Usuário (VUs)
Cada usuário virtual simula um fluxo de uso real em loop:
1. Faz uma requisição `GET /api/painel` para ler o painel financeiro.
2. Aguarda 500ms.
3. Faz uma requisição `POST /api/ativos` para cadastrar um novo ativo gerado aleatoriamente.
4. Aguarda 1 segundo antes de repetir o fluxo.

---

## 🚀 Como Executar o Teste de Carga

1. Certifique-se de ter o k6 instalado no sistema ([Guia de Instalação](https://k6.io/docs/get-started/installation/)).
2. Certifique-se de que a API está rodando localmente (`npm start`).
3. Execute o comando de performance no terminal do projeto:
   ```bash
   npm run test:perf
   ```

---

## 📊 Relatório Online

O relatório gráfico com os resultados detalhados da última execução de performance realizada pela pipeline do GitHub Actions pode ser acessado publicamente em:
👉 [https://Eduh06.github.io/portfolio/performance.html](https://Eduh06.github.io/portfolio/performance.html)
