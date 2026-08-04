const db = require('../models/db');

class RendimentosService {
  registrarRendimento(data) {
    const { mes, tipo, valor } = data;

    // Validar mês (Formato AAAA-MM)
    const mesRegex = /^\d{4}-\d{2}$/;
    if (!mes || !mesRegex.test(mes)) {
      throw new Error('Mês inválido. Formato esperado: AAAA-MM (Ex: 2026-08).');
    }

    // Validar tipo ('rendimento' ou 'aporte')
    if (!tipo || (tipo !== 'rendimento' && tipo !== 'aporte')) {
      throw new Error("Tipo inválido. Deve ser 'rendimento' ou 'aporte'.");
    }

    // Validar valor
    if (valor === undefined || isNaN(parseFloat(valor)) || parseFloat(valor) <= 0) {
      throw new Error('Valor deve ser um número maior que zero.');
    }

    return db.addRendimento({
      mes,
      tipo,
      valor: parseFloat(valor)
    });
  }

  listarRendimentos() {
    return db.getRendimentos();
  }
}

module.exports = new RendimentosService();
