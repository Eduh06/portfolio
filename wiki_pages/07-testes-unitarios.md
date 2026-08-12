# 07. Testes Unitários

Esta seção descreve a estrutura de **Testes Unitários** da aplicação, cujo foco é validar a integridade das regras de negócio isoladas das camadas de rede (HTTP).

---

## Objetivo e Escopo
Os testes unitários focam no [ativosService.js](file:///c:/Users/EduardodosSantos/projetos/portfolio/src/services/ativosService.js) e no [authService.js](file:///c:/Users/EduardodosSantos/projetos/portfolio/src/services/authService.js) para assegurar que todas as regras de validação interna, cálculos aritméticos e segurança estejam corretos.

### Regras de Negócio Testadas:
1. **Ativos (ativosService.js)**:
   *   **Cadastro com sucesso**: Persistência correta de um objeto ativo quando fornecidos dados válidos.
   *   **Rejeição de dados ausentes**: Lançamento de erro ao tentar criar um ativo sem código.
   *   **Validação de limites numéricos**: Lançamento de exceção se a quantidade ou o preço médio forem menores ou iguais a zero.
   *   **Recálculo de Preço Médio Ponderado**: Validação do recálculo ponderado ao cadastrar um ativo cujo código (`codigo`) já esteja em uso para o mesmo usuário.
2. **Autenticação (authService.js)**:
   *   **Cadastro com sucesso**: Persistência de usuários e geração do ID do usuário.
   *   **Criptografia**: Garantia de hashing seguro com bcryptjs (armazenamento de senha criptografada).
   *   **Unicidade de E-mail**: Bloqueio de cadastros duplicados de e-mails.
   *   **Login**: Geração de tokens JWT válidos e expiração padrão ao logar com credenciais corretas.

---

## Arquivos de Teste
A suite unitária está contida em:
- [ativos.test.js](file:///c:/Users/EduardodosSantos/projetos/portfolio/tests/unit/ativos.test.js)
- [auth.test.js](file:///c:/Users/EduardodosSantos/projetos/portfolio/tests/unit/auth.test.js)

---

## Como Executar
Rode o seguinte comando no terminal da aplicação para executar exclusivamente a suite unitária:
```bash
npm run test:unit
```