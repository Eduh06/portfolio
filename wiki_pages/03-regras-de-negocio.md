# 03. Regras de Negócio

Este documento centraliza as regras de negócio da API de Metas e Aportes, extraídas diretamente da lógica de implementação das camadas de serviço.

---

### **RN-01 - Cadastro de Ativos e Validações**
- Todos os campos (`codigo`, `nome`, `quantidade`, `precoMedio`) são obrigatórios.
- Campos de texto não podem estar vazios ou sem conteúdo válido.
- A `quantidade` e o `precoMedio` devem ser números reais estritamente maiores do que zero. Valores negativos ou zero retornam status **400 Bad Request**.
- O campo `codigo` do ativo é normalizado para letras maiúsculas (ex: `mxrf11` se torna `MXRF11`).

---

### **RN-02 - Consolidação Ponderada de Ativos Duplicados**
- A API não cria registros duplicados para o mesmo `codigo` de ativo.
- Caso seja enviado um cadastro de um ativo cujo `codigo` já exista no banco de dados, a API atualiza a quantidade somando o valor novo e calcula automaticamente um novo **preço médio ponderado** através da fórmula:

$$\text{Preço Médio Ponderado} = \frac{(Q_{\text{atual}} \times PM_{\text{atual}}) + (Q_{\text{novo}} \times PM_{\text{novo}})}{Q_{\text{atual}} + Q_{\text{novo}}}$$

- O retorno da requisição de um ativo duplicado atualizado é o status **201 Created** com o objeto atualizado.

---

### **RN-03 - Lançamento Mensal (Aportes/Rendimentos)**
- Todos os campos (`mes`, `tipo`, `valor`) são obrigatórios.
- O campo `mes` deve seguir rigidamente o padrão de formato de ano e mês `AAAA-MM` (ex: `2026-08`). Qualquer outro formato retorna status **400 Bad Request**.
- O campo `tipo` aceita apenas os valores string string `aporte` ou `rendimento`. Qualquer outra string gera erro de validação (status **400**).
- O campo `valor` deve ser maior do que zero.

---

### **RN-04 - Consolidação do Painel de Rentabilidade**
O endpoint `GET /api/painel` realiza dinamicamente os seguintes cálculos aritméticos:
1. **Total Investido**: Soma do custo total de aquisição de cada ativo em carteira:
   $$\text{Total Investido} = \sum (\text{quantidade} \times \text{precoMedio})$$
2. **Total Rendimentos**: Soma dos valores de todos os lançamentos com `tipo: 'rendimento'`.
3. **Total Aportes**: Soma dos valores de todos os lançamentos com `tipo: 'aporte'`.
4. **Total Acumulado**: Soma do total investido com o total de rendimentos recebidos:
   $$\text{Total Acumulado} = \text{Total Investido} + \text{Total Rendimentos}$$
5. **Porcentagem de Rendimento**: Relação percentual dos dividendos em relação ao capital investido em ativos:
   $$\text{Porcentagem de Rendimento} = \frac{\text{Total Rendimentos}}{\text{Total Investido}} \times 100$$
   *Caso o `Total Investido` seja zero (nenhum ativo em carteira), a porcentagem de rendimento retornará `0` para prevenir erros de divisão por zero.*
- Todos os números decimais retornados pela API são arredondados em duas casas decimais.
