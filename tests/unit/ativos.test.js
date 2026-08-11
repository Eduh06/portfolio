const { expect } = require('chai');
const ativosService = require('../../src/services/ativosService');
const { restoreDatabase } = require('../helpers/databaseSnapshot');

describe('Unit - Ativos Service', () => {
  const userId = 1;

  beforeEach(() => {
    restoreDatabase();
  });

  it('deve cadastrar um ativo válido com sucesso', () => {
    const data = {
      codigo: 'MXRF11',
      nome: 'Maxi Renda FII',
      quantidade: 100,
      precoMedio: 10.50
    };

    const result = ativosService.cadastrarAtivo(data, userId);

    expect(result).to.have.property('id');
    expect(result.codigo).to.equal('MXRF11');
    expect(result.nome).to.equal('Maxi Renda FII');
    expect(result.quantidade).to.equal(100);
    expect(result.precoMedio).to.equal(10.50);
  });

  it('deve rejeitar cadastro sem código do ativo', () => {
    const data = {
      nome: 'Maxi Renda FII',
      quantidade: 100,
      precoMedio: 10.50
    };

    expect(() => ativosService.cadastrarAtivo(data, userId)).to.throw(
      'Código do ativo é obrigatório e deve ser uma string válida.'
    );
  });

  it('deve rejeitar cadastro com quantidade menor ou igual a zero', () => {
    const data = {
      codigo: 'MXRF11',
      nome: 'Maxi Renda FII',
      quantidade: 0,
      precoMedio: 10.50
    };

    expect(() => ativosService.cadastrarAtivo(data, userId)).to.throw(
      'Quantidade deve ser um número maior que zero.'
    );
  });

  it('deve rejeitar cadastro com preço médio menor ou igual a zero', () => {
    const data = {
      codigo: 'MXRF11',
      nome: 'Maxi Renda FII',
      quantidade: 100,
      precoMedio: -5
    };

    expect(() => ativosService.cadastrarAtivo(data, userId)).to.throw(
      'Preço médio deve ser um número maior que zero.'
    );
  });

  it('deve atualizar quantidade e preço médio ponderado no caso de ativo duplicado', () => {
    const data1 = {
      codigo: 'MXRF11',
      nome: 'Maxi Renda FII',
      quantidade: 100,
      precoMedio: 10.00
    };

    const data2 = {
      codigo: 'mxrf11', // Testando case insensitivity
      nome: 'Maxi Renda FII Atualizado',
      quantidade: 50,
      precoMedio: 11.20
    };

    ativosService.cadastrarAtivo(data1, userId);
    const result = ativosService.cadastrarAtivo(data2, userId);

    // Novo total: Qtd = 100 + 50 = 150
    // Preço Médio = ((100 * 10) + (50 * 11.2)) / 150 = (1000 + 560) / 150 = 1560 / 150 = 10.4
    expect(result.quantidade).to.equal(150);
    expect(result.precoMedio).to.equal(10.4);
    expect(result.codigo).to.equal('MXRF11');
  });
});
