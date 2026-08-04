const painelService = require('../services/painelService');

class PainelController {
  obterDadosPainel(req, res) {
    try {
      const dados = painelService.obterDadosPainel();
      return res.status(200).json(dados);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno ao processar dados do painel.' });
    }
  }
}

module.exports = new PainelController();
