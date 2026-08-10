# 04. Integração Contínua (CI) da API

Para manter a integridade da aplicação e garantir que novos códigos não quebrem funcionalidades existentes, o repositório possui uma pipeline ativa de Integração Contínua (CI) configurada no **GitHub Actions** através do arquivo [ci.yml](https://github.com/Eduh06/portfolio/blob/master/.github/workflows/ci.yml).

### Funcionamento da Pipeline
Sempre que um novo código for enviado via `git push` ou um Pull Request for aberto para as branches `main`/`master`, a esteira de CI executa automaticamente os seguintes passos em um ambiente virtualizado Linux:

1. **Setup**: Configura o ambiente Node.js v20.
2. **Instalação**: Executa o download limpo de dependências com `npm install`.
3. **Instalação do k6**: Baixa e instala o binário do **k6** para execução dos testes de carga.
4. **Execução de Testes**:
   *   Inicializa o servidor Express em background.
   *   Executa os testes de performance via **k6** (`npm run test:perf`), gerando o arquivo `performance.html`.
   *   Executa os testes funcionais via **Mocha** (`npm test`), gerando o relatório unificado `index.html` (que engloba testes Unitários, de API e de Fumaça).
5. **Publicação (GitHub Pages)**:
   *   Faz o deploy automático de toda a pasta de relatórios para a branch `gh-pages` usando a chave de autenticação interna da pipeline.

---

### 📈 Links dos Relatórios Online (Sempre Atualizados)

Graças ao deploy automatizado, qualquer pessoa pode acompanhar o resultado dos testes em tempo real através dos links públicos abaixo:

*   **Relatório Funcional (Unitário, API e Fumaça)**: 
    👉 [https://Eduh06.github.io/portfolio/](https://Eduh06.github.io/portfolio/)
*   **Relatório de Carga e Performance (k6)**: 
    👉 [https://Eduh06.github.io/portfolio/performance.html](https://Eduh06.github.io/portfolio/performance.html)