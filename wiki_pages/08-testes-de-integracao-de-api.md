# 08. Testes de Integração de API

Esta seção descreve os **Testes de API**, responsáveis por validar o funcionamento dos endpoints HTTP de ponta a ponta.

---

## 🎯 Objetivo e Escopo
Validar o comportamento dos endpoints Express.js (Request, Controllers, Services e Modelos) garantindo que retornem os **Status Codes** e payloads JSON esperados.

### Endpoints e Fluxos Validados:
- **Ativos (`/api/ativos`)**: Valida o cadastro (Status 201) e comportamento com payloads inválidos (Status 400), bem como a listagem de registros cadastrados (Status 200).
- **Rendimentos (`/api/rendimentos`)**: Valida o registro de aportes e rendimentos (Status 201), rejeição de formatos incorretos (Status 400) e consulta de transações (Status 200).
- **Painel (`/api/painel`)**: Valida o retorno de indicadores zerados quando vazio e a consolidação correta das somas matemáticas após registros de ativos e rendimentos.

---

## 🧪 Isolamento do Banco de Dados
Para garantir a independência de cada caso de teste, utilizamos a função `beforeEach` para executar o helper [databaseSnapshot.js](file:///c:/Users/EduardodosSantos/projetos/portfolio/tests/helpers/databaseSnapshot.js). Esse script limpa o estado de ativos e lançamentos em memória antes de cada execução.

---

## 💻 Arquivos de Teste
Os arquivos de testes de API encontram-se em:
- [ativos.test.js](file:///c:/Users/EduardodosSantos/projetos/portfolio/tests/api/ativos.test.js)
- [rendimentos.test.js](file:///c:/Users/EduardodosSantos/projetos/portfolio/tests/api/rendimentos.test.js)
- [painel.test.js](file:///c:/Users/EduardodosSantos/projetos/portfolio/tests/api/painel.test.js)

---

## 📊 Relatório Mochawesome
Ao executar os testes de API, a ferramenta gera um relatório interativo contendo gráficos e logs de execução:
- **Caminho do Relatório HTML**: `mochawesome-report/api/api-tests.html`

---

## 🚀 Como Executar
Rode o comando no terminal do projeto:
```bash
npm run test:api
```