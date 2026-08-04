// Banco de dados em memória simples para armazenar ativos e rendimentos/aportes.

const db = {
  ativos: [],
  rendimentos: [],
  nextAtivoId: 1,
  nextRendimentoId: 1
};

module.exports = {
  // Ativos helper functions
  getAtivos: () => db.ativos,
  
  getAtivoById: (id) => db.ativos.find(a => a.id === parseInt(id)),
  
  getAtivoByCodigo: (codigo) => db.ativos.find(a => a.codigo.toUpperCase() === codigo.toUpperCase()),
  
  addAtivo: (ativo) => {
    const newAtivo = {
      id: db.nextAtivoId++,
      codigo: ativo.codigo.toUpperCase(),
      nome: ativo.nome,
      quantidade: parseFloat(ativo.quantidade),
      precoMedio: parseFloat(ativo.precoMedio)
    };
    db.ativos.push(newAtivo);
    return newAtivo;
  },
  
  updateAtivo: (id, data) => {
    const index = db.ativos.findIndex(a => a.id === parseInt(id));
    if (index === -1) return null;
    
    db.ativos[index] = {
      ...db.ativos[index],
      nome: data.nome !== undefined ? data.nome : db.ativos[index].nome,
      quantidade: data.quantidade !== undefined ? parseFloat(data.quantidade) : db.ativos[index].quantidade,
      precoMedio: data.precoMedio !== undefined ? parseFloat(data.precoMedio) : db.ativos[index].precoMedio
    };
    return db.ativos[index];
  },

  // Rendimentos helper functions
  getRendimentos: () => db.rendimentos,
  
  addRendimento: (rendimento) => {
    const newRendimento = {
      id: db.nextRendimentoId++,
      mes: rendimento.mes, // Formato esperado YYYY-MM
      tipo: rendimento.tipo, // 'rendimento' ou 'aporte'
      valor: parseFloat(rendimento.valor)
    };
    db.rendimentos.push(newRendimento);
    return newRendimento;
  },

  // Para fins de teste/reset se necessário
  clearDb: () => {
    db.ativos = [];
    db.rendimentos = [];
    db.nextAtivoId = 1;
    db.nextRendimentoId = 1;
  }
};
