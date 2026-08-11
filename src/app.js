const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const ativosRoutes = require('./routes/ativosRoutes');
const rendimentosRoutes = require('./routes/rendimentosRoutes');
const painelRoutes = require('./routes/painelRoutes');
const swaggerRoutes = require('./routes/swaggerRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Registro de Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/ativos', ativosRoutes);
app.use('/api/rendimentos', rendimentosRoutes);
app.use('/api/painel', painelRoutes);

// Endpoint para renderizar o Swagger UI
app.use('/api-docs', swaggerRoutes);
app.use('/swagger', swaggerRoutes);

// Redirecionamento da raiz para a documentação
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Configuração da porta
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;
