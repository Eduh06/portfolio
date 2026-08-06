# 04. Integração Contínua (CI) da API

Para manter a integridade da aplicação e garantir que novos códigos não quebrem funcionalidades existentes, o repositório está pronto para integração com o **GitHub Actions**.

### Pipeline de Integração Contínua
Sempre que um novo código for enviado via `git push` ou um Pull Request for aberto para a branch `main`/`master`, a esteira de CI executa as seguintes tarefas:

1. **Setup**: Instala o ambiente Node.js na máquina virtual.
2. **Dependências**: Executa o download limpo de dependências com `npm install`.
3. **Testes**: Executa todas as suites de testes do projeto sequencialmente via `npm test`.
4. **Relatórios**: Executa o teste de API e faz o upload dos relatórios gerados pelo `mochawesome` como artefato (`api-mochawesome-report`) no GitHub.