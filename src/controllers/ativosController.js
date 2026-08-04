const ativosService = require('../services/ativosService');

class AtivosController {
  cadastrarAtivo(req, res) {
    try {
      const novoAtivo = ativosService.cadastrarAtivo(req.body);
      return res.status(201).json(novoAtivo);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  listarAtivos(req, res) {
    try {
      const ativos = ativosService.listarAtivos();
      return res.status(200).json(ativos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno ao listar ativos.' });
    }
  }
}

module.exports = new AtivosController();
