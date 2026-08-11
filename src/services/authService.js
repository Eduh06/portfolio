const jwt = require('jsonwebtoken');
const db = require('../models/db');

// Chave secreta para assinatura dos tokens JWT
const JWT_SECRET = process.env.JWT_SECRET || 'senha_secreta_default_de_teste';

module.exports = {
  registrarUsuario: (data) => {
    const { email, password } = data;

    if (!email || !password) {
      throw new Error('E-mail e senha são obrigatórios.');
    }

    // BUG A: Não verifica se o e-mail já existe no db antes de criar.
    // BUG B: Repassa a senha em texto limpo, sem aplicar hashing.
    const user = db.addUser({ email, password });
    
    return {
      id: user.id,
      email: user.email
    };
  },

  loginUsuario: (data) => {
    const { email, password } = data;

    if (!email || !password) {
      throw new Error('E-mail e senha são obrigatórios.');
    }

    const user = db.getUserByEmail(email);
    if (!user) {
      throw new Error('Credenciais inválidas.');
    }

    // BUG B: Comparação direta de strings (texto plano), sem usar bcrypt.compare
    if (user.password !== password) {
      throw new Error('Credenciais inválidas.');
    }

    // Geração do token JWT contendo ID e e-mail do usuário
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return {
      user: {
        id: user.id,
        email: user.email
      },
      token
    };
  }
};
