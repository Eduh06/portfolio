# Rastreador Simples de Metas e Aportes - API REST

Esta é uma API REST desenvolvida em Node.js com Express para atuar como um Rastreador Simples de Metas e Aportes. A API gerencia o cadastro de ativos/categorias, registra aportes e rendimentos mensais, e gera relatórios consolidados de rentabilidade de forma automatizada no painel.

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura em camadas estruturada para promover separação de conceitos, facilidade de manutenção e testabilidade:

- **`src/models/`**: Camada de persistência em memória. Define as coleções de dados (ativos e rendimentos/aportes) e os métodos auxiliares de leitura e gravação.
- **`src/services/`**: Camada de lógica de negócios. Realiza as validações e calcula os indicadores consolidados do painel (Total Investido, Rendimento Acumulado, Total Acumulado e Percentual de Rendimento).
- **`src/controllers/`**: Camada de controle. Intermedeia as chamadas HTTP e a lógica de negócios, controlando os códigos de status HTTP e formatação de respostas e erros.
- **`src/routes/`**: Camada de roteamento. Define os endpoints do servidor e direciona as requisições para seus respectivos controllers.
- **`src/resources/`**: Contém arquivos de configuração estática e recursos do projeto (como a especificação do Swagger JSON).

---

## 🛠️ Tecnologias Utilizadas

- **Runtime**: Node.js
- **Framework Web**: Express.js
- **Documentação**: Swagger UI Express
- **Configurações adicionais**: CORS middleware

---

## 🚀 Como Executar o Projeto

1. Certifique-se de ter o **Node.js** instalado em sua máquina.
2. No diretório raiz do projeto, instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```
4. O servidor iniciará por padrão na porta `3000`. Acesse:
   - API: `http://localhost:3000`
   - Documentação Swagger: `http://localhost:3000/api-docs` ou `http://localhost:3000/swagger`

---

## 📍 Endpoints da API

A documentação interativa completa dos endpoints e seus modelos de erro (status code 400, 500) e sucesso está descrita no Swagger. Abaixo, um resumo rápido dos endpoints disponíveis:

### 1. Ativos (`/api/ativos`)
- **`POST /api/ativos`**: Cadastra um ativo ou categoria. Se o ativo já existir (mesmo código), adiciona a quantidade e calcula o novo preço médio ponderado automaticamente.
  - **Payload Exemplo**:
    ```json
    {
      "codigo": "MXRF11",
      "nome": "Maxi Renda FII",
      "quantidade": 100,
      "precoMedio": 10.50
    }
    ```
- **`GET /api/ativos`**: Lista todos os ativos ou categorias cadastradas no banco de dados em memória.

### 2. Rendimentos e Aportes (`/api/rendimentos`)
- **`POST /api/rendimentos`**: Registra uma entrada mensal. O campo `tipo` aceita apenas `"rendimento"` ou `"aporte"`. O campo `mes` deve seguir o padrão `AAAA-MM`.
  - **Payload Exemplo**:
    ```json
    {
      "mes": "2026-08",
      "tipo": "rendimento",
      "valor": 150.00
    }
    ```
- **`GET /api/rendimentos`**: Lista todas as entradas e rendimentos registrados.

### 3. Painel (`/api/painel`)
- **`GET /api/painel`**: Retorna os cálculos automáticos consolidados:
  - **Total Investido**: `Soma de (quantidade * precoMedio)` de todos os ativos.
  - **Total Rendimentos**: `Soma de todos os valores` onde `tipo === "rendimento"`.
  - **Total Aportes**: `Soma de todos os valores` onde `tipo === "aporte"`.
  - **Total Acumulado**: `Total Investido + Total Rendimentos`.
  - **Porcentagem de Rendimento**: `(Total Rendimentos / Total Investido) * 100`.
  - **Resposta Exemplo**:
    ```json
    {
      "totalInvestido": 1050.00,
      "totalRendimentos": 150.00,
      "totalAportes": 500.00,
      "totalAcumulado": 1200.00,
      "porcentagemRendimento": 14.29
    }
    ```

---

## 🧪 Testes Automatizados

O projeto conta com testes unitários, testes de integração de API e testes de fumaça:

- Executar todos os testes:
  ```bash
  npm test
  ```
- Executar apenas testes de API e gerar o relatório do Mochawesome:
  ```bash
  npm run test:api
  ```
O relatório HTML do Mochawesome será salvo em `mochawesome-report/api/api-tests.html`.

---

## ⚡ Testes de Performance (Carga)

Adicionalmente, você pode executar testes de carga utilizando o **k6** para validar o desempenho da API sob acessos concorrentes:

1. Instale o k6 em sua máquina (Instruções em: [k6.io](https://k6.io/)).
2. Inicie a API localmente:
   ```bash
   npm start
   ```
3. Rode o teste de carga:
   ```bash
   npm run test:perf
   ```
O teste simula o escalonamento de usuários virtuais (VUs) e valida os tempos de resposta e taxa de erros dos endpoints da aplicação.

