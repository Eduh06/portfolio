const rendimentosService = require('../services/rendimentosService');

class RendimentosController {
  registrarRendimento(req, res) {
    try {
      const novoRendimento = rendimentosService.registrarRendimento(req.body);
      return res.status(201).json(novoRendimento);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  listarRendimentos(req, res) {
    try {
      const rendimentos = rendimentosService.listarRendimentos();
      return res.status(200).json(rendimentos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno ao listar rendimentos/aportes.' });
    }
  }
}

module.exports = new RendimentosController();
