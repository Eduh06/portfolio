const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'senha_secreta_default_de_teste';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token de autenticação não fornecido.' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ erro: 'Formato de token inválido. Use "Bearer <token>".' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Injeta os dados do usuário autenticado no objeto de requisição
    req.user = {
      id: decoded.id,
      email: decoded.email
    };
    return next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
};
