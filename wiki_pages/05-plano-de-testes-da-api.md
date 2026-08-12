# 05. Plano e Estratégia de Testes da API

Este plano foi concebido seguindo as diretrizes gerais de qualidade da mentoria, servindo para estruturar e validar a API de controle financeiro pessoal.

## Informações do Documento

| Campo | Valor |
| --- | --- |
| Identificador Único | PL-TEST-001 |
| Organização | Rastreador Simples de Metas e Aportes |
| Autor | Eduh06 / QA |
| Versão | 1.0 |
| Data | 2026-08-04 |
| Base Normativa | ISO/IEC/IEEE 29119-3:2021 |

---

## Escopo e Histórias de Usuário (Estimativas)

Para o desenvolvimento e validação, o esforço estimado em testes para as histórias de usuário mapeadas foi:

| Código | História de Usuário / Funcionalidade | Estimativa de Esforço |
| --- | --- | --- |
| **US01** | Cadastro e Listagem de Ativos | 2 horas |
| **US02** | Registro de Lançamento Mensal (Aportes/Rendimentos) | 2 horas |
| **US03** | Painel de Consolidado Patrimonial e Rentabilidade | 1.5 horas |
| **US04** | Documentação e Interface do Swagger UI | 1 hora |
| **US05** | Avaliação de Desempenho e Carga Concorrente (k6) | 2 horas |
| **US06** | Cadastro, Login e Autenticação JWT com Isolamento | 3 horas |

---

## Estratégia de Cobertura e Camadas de Testes

### 1. Camada Unitária
- **Foco**: Validar a camada de serviço (`ativosService.js`, `rendimentosService.js` e `authService.js`) isoladamente do protocolo HTTP.
- **Validações**: Lançamento de exceções, cálculo de preço médio ponderado, criptografia de senhas (hashing com bcryptjs), validação de regras de login, rejeição de e-mails duplicados e limites numéricos.

### 2. Camada de Integração (API)
- **Foco**: Validar a integração entre rotas, controladores e persistência em memória através de chamadas HTTP reais (`supertest`).
- **Validações**: Validação de contratos JSON, retorno de Status Codes (201, 200, 400, 401, 500), envio correto do token Bearer JWT e o isolamento de dados por usuário (garantindo que um usuário não acesse os ativos/rendimentos de outro).

### 3. Camada de Fumaça (Smoke)
- **Foco**: Garantir que as partes estruturais da aplicação estão acessíveis e protegidas.
- **Validações**: Carregamento da interface de usuário do Swagger, redirecionamentos das rotas de entrada e bloqueio com código `401 Unauthorized` ao acessar rotas privadas sem token.

### 4. Camada de Performance (Carga)
- **Foco**: Avaliar o comportamento e estabilidade da API sob tráfego concorrente utilizando o k6.
- **Validações**: Realizar login de usuários em setup, injetar o token JWT obtido sob carga concorrente, e validar thresholds de taxa de falhas (`http_req_failed` < 1%) e tempos de resposta.