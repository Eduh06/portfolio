const db = require('../models/db');

class PainelService {
  obterDadosPainel() {
    const ativos = db.getAtivos();
    const rendimentos = db.getRendimentos();

    // Calcular total investido em ativos (quantidade * precoMedio)
    const totalInvestido = ativos.reduce((acc, ativo) => {
      return acc + (ativo.quantidade * ativo.precoMedio);
    }, 0);

    // Calcular total de rendimentos recebidos (apenas do tipo 'rendimento')
    const totalRendimentos = rendimentos
      .filter(r => r.tipo === 'rendimento')
      .reduce((acc, r) => acc + r.valor, 0);

    // Calcular total de aportes feitos (apenas do tipo 'aporte')
    const totalAportes = rendimentos
      .filter(r => r.tipo === 'aporte')
      .reduce((acc, r) => acc + r.valor, 0);

    // Total Acumulado = Total Investido em Ativos + Total de Rendimentos
    const totalAcumulado = totalInvestido + totalRendimentos;

    // Calcular porcentagem de rendimento em relação ao total investido
    let porcentagemRendimento = 0;
    if (totalInvestido > 0) {
      porcentagemRendimento = (totalRendimentos / totalInvestido) * 100;
    }

    return {
      totalInvestido: parseFloat(totalInvestido.toFixed(2)),
      totalRendimentos: parseFloat(totalRendimentos.toFixed(2)),
      totalAportes: parseFloat(totalAportes.toFixed(2)),
      totalAcumulado: parseFloat(totalAcumulado.toFixed(2)),
      porcentagemRendimento: parseFloat(porcentagemRendimento.toFixed(2))
    };
  }
}

module.exports = new PainelService();
