# 02. Endpoints e Swagger

Toda a documentação OpenAPI/Swagger foi construída no arquivo de recurso `src/resources/swagger.json` e é servida de forma interativa nas seguintes rotas:

- **Swagger UI (Página Visual)**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs) ou [http://localhost:3000/swagger](http://localhost:3000/swagger)
- **Contrato OpenAPI (JSON Estático)**: Utilizado para importação em ferramentas como Postman, Insomnia ou ferramentas de testes automatizados.

---

## Detalhamento dos Endpoints

### 1. Ativos (`/api/ativos`)
- **`POST /api/ativos`**: Cadastra um novo ativo ou categoria. Se o ativo já existir, consolida a quantidade e calcula o novo preço médio ponderado.
  - **Payload Esperado**:
    ```json
    {
      "codigo": "MXRF11",
      "nome": "Maxi Renda FII",
      "quantidade": 100,
      "precoMedio": 10.50
    }
    ```
- **`GET /api/ativos`**: Retorna a lista completa de ativos cadastrados.

### 2. Rendimentos e Aportes (`/api/rendimentos`)
- **`POST /api/rendimentos`**: Registra uma entrada financeira (aporte ou rendimento).
  - **Payload Esperado**:
    ```json
    {
      "mes": "2026-08",
      "tipo": "rendimento", // Aceita apenas 'aporte' ou 'rendimento'
      "valor": 150.00
    }
    ```
- **`GET /api/rendimentos`**: Retorna o histórico de todas as transações registradas.

### 3. Painel (`/api/painel`)
- **`GET /api/painel`**: Retorna os indicadores matemáticos calculados de forma consolidada e dinâmica.
  - **JSON Retornado**:
    ```json
    {
      "totalInvestido": 1050.00,
      "totalRendimentos": 150.00,
      "totalAportes": 500.00,
      "totalAcumulado": 1200.00,
      "porcentagemRendimento": 14.29
    }
    ```
