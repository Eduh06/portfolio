# 07. Testes Unitários

Esta seção descreve a estrutura de **Testes Unitários** da aplicação, cujo foco é validar a integridade das regras de negócio isoladas das camadas de rede (HTTP).

---

## Objetivo e Escopo
Os testes unitários focam no [ativosService.js](file:///c:/Users/EduardodosSantos/projetos/portfolio/src/services/ativosService.js) para assegurar que todas as regras de validação interna e cálculos aritméticos de consolidação de carteira estejam corretos.

### Regras de Negócio Testadas:
1. **Cadastro com sucesso**: Persistência correta de um objeto ativo quando fornecidos dados válidos.
2. **Rejeição de dados ausentes**: Lançamento de erro ao tentar criar um ativo sem código.
3. **Validação de limites numéricos**: Lançamento de exceção se a quantidade ou o preço médio forem menores ou iguais a zero.
4. **Recálculo de Preço Médio Ponderado**: Validação do recálculo ponderado ao cadastrar um ativo cujo código (`codigo`) já esteja em uso.

---

## Arquivo de Teste
A suite unitária está contida em:
- [ativos.test.js](file:///c:/Users/EduardodosSantos/projetos/portfolio/tests/unit/ativos.test.js)

---

## Como Executar
Rode o seguinte comando no terminal da aplicação para executar exclusivamente a suite unitária:
```bash
npm run test:unit
```