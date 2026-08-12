# 09. Testes de Fumaça (Smoke)

Esta seção descreve os **Testes de Fumaça (Smoke Tests)**, cujo objetivo é verificar rapidamente a acessibilidade e a integridade da infraestrutura do servidor Express.

---

## Objetivo e Escopo
Os testes de fumaça não validam lógica de negócio profunda; em vez disso, funcionam como um termômetro para certificar que o servidor está no ar, respondendo corretamente às rotas principais de infraestrutura e aplicando os bloqueios de segurança nas rotas privadas.

### Pontos Validados:
- **Redirecionamento da Raiz (`/`)**: Verifica se o servidor responde de imediato redirecionando o cliente para a documentação técnica (Status 302 Found).
- **Acessibilidade do Swagger (`/api-docs`)**: Garante que a documentação gráfica do Swagger UI é montada e servida com sucesso contendo uma estrutura HTML válida (Status 200 OK).
- **Bloqueio de Segurança sem Token**: Garante de forma ágil que requisições para rotas protegidas (como `GET /api/ativos`) sem o cabeçalho de autenticação adequado são bloqueadas de imediato com o status HTTP `401 Unauthorized`.

---

## Arquivo de Teste
A suite de fumaça está localizada em:
- [smoke.test.js](file:///c:/Users/EduardodosSantos/projetos/portfolio/tests/smoke/smoke.test.js)

---

## Como Executar
Rode o comando no terminal do projeto:
```bash
npm run test:smoke
```