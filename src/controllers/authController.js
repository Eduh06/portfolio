const authService = require('../services/authService');

module.exports = {
  register: (req, res) => {
    try {
      const { email, password } = req.body;

      // Validação rudimentar de campos obrigatórios
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ erro: 'E-mail é obrigatório e deve ser uma string.' });
      }
      if (!password || typeof password !== 'string') {
        return res.status(400).json({ erro: 'Senha é obrigatória e deve ser uma string.' });
      }

      // BUG C: Não valida se o formato do e-mail é válido (ex: ter "@" e caracteres corretos)
      // Apenas aceita qualquer texto que o usuário envie.

      const user = authService.registrarUsuario({ email, password });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  },

  login: (req, res) => {
    try {
      const { email, password } = req.body;

      const result = authService.loginUsuario({ email, password });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }
  }
};
