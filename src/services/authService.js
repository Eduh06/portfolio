const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models/db');

// Chave secreta para assinatura dos tokens JWT
const JWT_SECRET = process.env.JWT_SECRET || 'senha_secreta_default_de_teste';

module.exports = {
  registrarUsuario: (data) => {
    const { email, password } = data;

    if (!email || !password) {
      throw new Error('E-mail e senha são obrigatórios.');
    }

    // RESOLUÇÃO BUG A: Valida se o e-mail já existe no banco antes de cadastrar
    const existingUser = db.getUserByEmail(email);
    if (existingUser) {
      throw new Error('E-mail já cadastrado.');
    }

    // RESOLUÇÃO BUG B: Criptografa a senha com hash seguro do bcrypt antes de salvar
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = db.addUser({ email, password: hashedPassword });
    
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

    // RESOLUÇÃO BUG B: Compara o hash seguro da senha com a senha informada
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
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
