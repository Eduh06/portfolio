const { expect } = require('chai');
const authService = require('../../src/services/authService');
const db = require('../../src/models/db');

describe('Unit - Serviço de Autenticação', () => {
  beforeEach(() => {
    db.clearDb();
  });

  it('deve registrar um novo usuário com sucesso', () => {
    const data = { email: 'user@example.com', password: 'password123' };
    const result = authService.registrarUsuario(data);
    
    expect(result).to.have.property('id');
    expect(result.email).to.equal('user@example.com');
    expect(result).to.not.have.property('password');
  });

  it('deve rejeitar registro se e-mail e senha não forem fornecidos', () => {
    expect(() => authService.registrarUsuario({ email: 'user@example.com' })).to.throw(
      'E-mail e senha são obrigatórios.'
    );
  });

  it('deve rejeitar registro de e-mails duplicados', () => {
    const data = { email: 'dup@example.com', password: 'password123' };
    authService.registrarUsuario(data);

    expect(() => authService.registrarUsuario(data)).to.throw(
      'E-mail já cadastrado.'
    );
  });

  it('deve salvar a senha de forma criptografada (hash)', () => {
    const data = { email: 'secure@example.com', password: 'password123' };
    authService.registrarUsuario(data);

    const savedUser = db.getUserByEmail('secure@example.com');
    expect(savedUser.password).to.not.equal('password123'); // A senha não deveria ser igual ao texto plano
  });

  it('deve realizar login com sucesso e retornar token JWT', () => {
    const data = { email: 'login@example.com', password: 'password123' };
    authService.registrarUsuario(data);

    const result = authService.loginUsuario(data);
    expect(result).to.have.property('token');
    expect(result.user.email).to.equal('login@example.com');
  });
});
