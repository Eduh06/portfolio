// Banco de dados em memória simples para armazenar usuários, ativos e rendimentos/aportes.

const db = {
  users: [],
  ativos: [],
  rendimentos: [],
  nextUserId: 1,
  nextAtivoId: 1,
  nextRendimentoId: 1
};

module.exports = {
  // Usuários helper functions
  getUsers: () => db.users,
  
  getUserById: (id) => db.users.find(u => u.id === parseInt(id)),
  
  getUserByEmail: (email) => db.users.find(u => u.email.toLowerCase() === email.toLowerCase()),
  
  addUser: (user) => {
    const newUser = {
      id: db.nextUserId++,
      email: user.email,
      password: user.password
    };
    db.users.push(newUser);
    return newUser;
  },

  // Ativos helper functions (com isolamento por userId)
  getAtivos: (userId) => db.ativos.filter(a => a.userId === parseInt(userId)),
  
  getAtivoById: (id, userId) => db.ativos.find(a => a.id === parseInt(id) && a.userId === parseInt(userId)),
  
  getAtivoByCodigo: (codigo, userId) => 
    db.ativos.find(a => a.codigo.toUpperCase() === codigo.toUpperCase() && a.userId === parseInt(userId)),
  
  addAtivo: (ativo, userId) => {
    const newAtivo = {
      id: db.nextAtivoId++,
      userId: parseInt(userId),
      codigo: ativo.codigo.toUpperCase(),
      nome: ativo.nome,
      quantidade: parseFloat(ativo.quantidade),
      precoMedio: parseFloat(ativo.precoMedio)
    };
    db.ativos.push(newAtivo);
    return newAtivo;
  },
  
  updateAtivo: (id, data, userId) => {
    const index = db.ativos.findIndex(a => a.id === parseInt(id) && a.userId === parseInt(userId));
    if (index === -1) return null;
    
    db.ativos[index] = {
      ...db.ativos[index],
      nome: data.nome !== undefined ? data.nome : db.ativos[index].nome,
      quantidade: data.quantidade !== undefined ? parseFloat(data.quantidade) : db.ativos[index].quantidade,
      precoMedio: data.precoMedio !== undefined ? parseFloat(data.precoMedio) : db.ativos[index].precoMedio
    };
    return db.ativos[index];
  },

  // Rendimentos helper functions (com isolamento por userId)
  getRendimentos: (userId) => db.rendimentos.filter(r => r.userId === parseInt(userId)),
  
  addRendimento: (rendimento, userId) => {
    const newRendimento = {
      id: db.nextRendimentoId++,
      userId: parseInt(userId),
      mes: rendimento.mes, // Formato esperado YYYY-MM
      tipo: rendimento.tipo, // 'rendimento' ou 'aporte'
      valor: parseFloat(rendimento.valor)
    };
    db.rendimentos.push(newRendimento);
    return newRendimento;
  },

  // Para fins de teste/reset
  clearDb: () => {
    db.users = [];
    db.ativos = [];
    db.rendimentos = [];
    db.nextUserId = 1;
    db.nextAtivoId = 1;
    db.nextRendimentoId = 1;
  }
};
