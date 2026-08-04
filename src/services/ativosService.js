const db = require('../models/db');

class AtivosService {
  cadastrarAtivo(data) {
    const { codigo, nome, quantidade, precoMedio } = data;

    if (!codigo || typeof codigo !== 'string' || codigo.trim() === '') {
      throw new Error('Código do ativo é obrigatório e deve ser uma string válida.');
    }
    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
      throw new Error('Nome do ativo é obrigatório e deve ser uma string válida.');
    }
    if (quantidade === undefined || isNaN(parseFloat(quantidade)) || parseFloat(quantidade) <= 0) {
      throw new Error('Quantidade deve ser um número maior que zero.');
    }
    if (precoMedio === undefined || isNaN(parseFloat(precoMedio)) || parseFloat(precoMedio) <= 0) {
      throw new Error('Preço médio deve ser um número maior que zero.');
    }

    const codigoUpper = codigo.trim().toUpperCase();
    const existing = db.getAtivoByCodigo(codigoUpper);
    if (existing) {
      // Se já existe, atualizamos adicionando à quantidade e calculando o novo preço médio ponderado
      const novaQuantidade = existing.quantidade + parseFloat(quantidade);
      const novoPrecoMedio = ((existing.quantidade * existing.precoMedio) + (parseFloat(quantidade) * parseFloat(precoMedio))) / novaQuantidade;
      
      return db.updateAtivo(existing.id, {
        quantidade: novaQuantidade,
        precoMedio: novoPrecoMedio
      });
    }

    return db.addAtivo({
      codigo: codigoUpper,
      nome: nome.trim(),
      quantidade: parseFloat(quantidade),
      precoMedio: parseFloat(precoMedio)
    });
  }

  listarAtivos() {
    return db.getAtivos();
  }
}

module.exports = new AtivosService();
