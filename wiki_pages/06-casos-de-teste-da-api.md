# 06. Casos de Teste da API

Este documento detalha as especificações de cada caso de teste (CT) implementado na automação do projeto **Rastreador Simples de Metas e Aportes**.

---

## ️ Especificação dos Casos de Teste

### CT-API-001: Cadastrar Ativo Válido
*   **Camada**: API
*   **Pré-condições**: Banco de dados limpo.
*   **Ação**: Enviar requisição `POST /api/ativos` com payload completo e válido.
*   **Dados de Entrada**:
    ```json
    {
      "codigo": "MXRF11",
      "nome": "Maxi Renda FII",
      "quantidade": 100,
      "precoMedio": 10.50
    }
    ```
*   **Resultado Esperado**: Retornar status `201 Created` contendo o objeto criado com um `id` numérico gerado e o código em maiúsculo.

---

### CT-API-002: Atualização e Preço Médio Ponderado de Ativo Repetido
*   **Camada**: Unidade / API
*   **Pré-condições**: Ativo `MXRF11` com `quantidade: 100` e `precoMedio: 10.00` já cadastrado.
*   **Ação**: Enviar requisição `POST /api/ativos` com `codigo: 'MXRF11'`, `quantidade: 50` e `precoMedio: 11.20`.
*   **Resultado Esperado**: Retornar status `201 Created` contendo o ativo atualizado com `quantidade: 150` e `precoMedio: 10.40`.

---

### CT-API-003: Bloquear Cadastro de Ativo Inválido
*   **Camada**: API / Unidade
*   **Ação**: Enviar requisição `POST /api/ativos` com valores numéricos negativos ou vazios.
*   **Resultado Esperado**: Retornar status `400 Bad Request` com uma mensagem de erro detalhada no JSON.

---

### CT-API-004: Registrar Aporte Válido
*   **Camada**: API
*   **Ação**: Enviar requisição `POST /api/rendimentos` com `tipo: 'aporte'`, `mes: '2026-08'$ e `valor: 500.00`.
*   **Resultado Esperado**: Retornar status `201 Created` e registrar com sucesso a movimentação patrimonial.

---

### CT-API-005: Registrar Rendimento Válido
*   **Camada**: API
*   **Ação**: Enviar requisição `POST /api/rendimentos` com `tipo: 'rendimento'`, `mes: '2026-08'` e `valor: 150.75`.
*   **Resultado Esperado**: Retornar status `201 Created` e registrar o rendimento recebido.

---

### CT-API-006: Bloquear Lançamento Inválido
*   **Camada**: API
*   **Ação**: Enviar requisição `POST /api/rendimentos` com tipo incorreto (ex: `saque`) ou data incorreta (ex: `08-2026`).
*   **Resultado Esperado**: Retornar status `400 Bad Request` informando o erro de validação do tipo ou formato de data.

---

### CT-API-007: Consultar Métricas do Painel Vazio
*   **Camada**: API
*   **Pré-condições**: Banco de dados limpo.
*   **Ação**: Enviar requisição `GET /api/painel`.
*   **Resultado Esperado**: Retornar status `200 OK` e todas as métricas calculadas em `0`.

---

### CT-API-008: Validar Cálculos Consolidados do Painel
*   **Camada**: API
*   **Pré-condições**: Ativos cadastrados (Total Investido = R$ 1000) + Rendimentos registrados (R$ 100) + Aportes registrados (R$ 500).
*   **Ação**: Enviar requisição `GET /api/painel`.
*   **Resultado Esperado**: Retornar status `200 OK` contendo os indicadores:
    *   `totalInvestido`: 1000.00
    *   `totalRendimentos`: 100.00
    *   `totalAportes`: 500.00
    *   `totalAcumulado`: 1100.00
    *   `porcentagemRendimento`: 10.00

---

### CT-API-009: Teste de Fumaça - Redirecionamento da Raiz
*   **Camada**: Smoke
*   **Ação**: Enviar requisição `GET /` para o servidor.
*   **Resultado Esperado**: Retornar status `302 Found` e redirecionar o cliente para `/api-docs`.

---

### CT-API-010: Teste de Fumaça - Acessibilidade do Swagger
*   **Camada**: Smoke
*   **Ação**: Enviar requisição `GET /api-docs/`.
*   **Resultado Esperado**: Retornar status `200 OK` com conteúdo do tipo HTML contendo a renderização da interface do Swagger UI.

---

### CT-API-011: Teste de Carga e Performance (k6)
*   **Camada**: Performance (Carga)
*   **Pré-condições**: API rodando localmente (\`npm start\`).
*   **Ação**: Executar o teste de carga concorrente simulando tráfego progressivo até 15 usuários virtuais (VUs) simultâneos através do k6.
*   **Resultado Esperado**: Retornar status \`200\` para a leitura do painel e \`201\` para os cadastros de ativos concorrentes. Toda a execução deve atender aos limites definidos (Thresholds):
    - Taxa de falhas de requisição HTTP (\`http_req_failed\`) menor do que 1%.
    - Tempo de resposta P95 (\`http_req_duration\`) menor do que 200ms.

---

### CT-API-012: Registrar Usuário Válido
*   **Camada**: API / Unidade
*   **Ação**: Enviar requisição `POST /api/auth/register` com e-mail e senha válidos.
*   **Resultado Esperado**: Retornar status `201 Created` contendo o objeto de usuário criado (apenas com `id` e `email`, sem expor o campo `password`).

---

### CT-API-013: Rejeitar Registro de E-mail Duplicado
*   **Camada**: Unidade
*   **Pré-condições**: Usuário com o e-mail `dup@example.com` já cadastrado no banco.
*   **Ação**: Tentar registrar um novo usuário com o mesmo e-mail `dup@example.com`.
*   **Resultado Esperado**: Lançar um erro informando que o e-mail já está cadastrado.

---

### CT-API-014: Criptografia de Senha (Segurança)
*   **Camada**: Unidade
*   **Ação**: Registrar um usuário. Inspecionar o registro salvo no banco.
*   **Resultado Esperado**: A senha salva no banco não deve ser igual à senha digitada em texto plano (deve estar convertida em hash seguro).

---

### CT-API-015: Login com Credenciais Válidas
*   **Camada**: API / Unidade
*   **Pré-condições**: Usuário cadastrado no sistema.
*   **Ação**: Enviar requisição `POST /api/auth/login` com as credenciais válidas correspondentes.
*   **Resultado Esperado**: Retornar status `200 OK` contendo os dados básicos do usuário e o token de acesso JWT.

---

### CT-API-016: Rejeitar Login com Credenciais Inválidas
*   **Camada**: API
*   **Ação**: Enviar requisição `POST /api/auth/login` com senha incorreta ou e-mail inexistente.
*   **Resultado Esperado**: Retornar status `401 Unauthorized` informando erro de credenciais.

---

### CT-API-017: Bloquear Acesso a Rota Protegida sem Token
*   **Camada**: Smoke / API
*   **Ação**: Fazer requisição `GET /api/ativos` sem fornecer cabeçalhos de autenticação.
*   **Resultado Esperado**: Retornar status `401 Unauthorized` com a mensagem `"Token de autenticação não fornecido."`.

---

### CT-API-018: Validação de Formato de E-mail no Cadastro
*   **Camada**: API (Validação de Input)
*   **Ação**: Enviar requisição `POST /api/auth/register` com e-mail sem formato válido (ex: `usuario_sem_arroba`).
*   **Resultado Esperado**: Retornar status `400 Bad Request` indicando erro de formato de e-mail inválido.