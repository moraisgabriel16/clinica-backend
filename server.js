// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Permite o uso de variáveis de ambiente

// Inicialização do servidor Express
const app = express();

// Middlewares
app.use(cors()); // Permite que o frontend se conecte ao backend
app.use(bodyParser.json()); // Permite processar requisições JSON

// Conexão com o MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://odonto1:gaga123@odonto.lyz0z.mongodb.net/clinica?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Encerra a aplicação caso a conexão falhe
  });

// Importação das rotas
const pacienteRoutes = require('./routes/pacienteRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const dentistaRoutes = require('./routes/dentistaRoutes');
const procedimentoRoutes = require('./routes/procedimentoRoutes');
const horarioRoutes = require('./routes/horarioRoutes');

// Definição das rotas
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/agendamentos', agendamentoRoutes);
app.use('/api/dentistas', dentistaRoutes);
app.use('/api/procedimentos', procedimentoRoutes);
app.use('/api/horarios', horarioRoutes);

// Rota principal para verificar o funcionamento do servidor
app.get('/', (req, res) => {
  res.send('Bem-vindo à API da Clínica Odontológica!');
});

// Rota para tratar 404 (quando nenhuma rota é encontrada)
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Tratamento de erros globais
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno no servidor', error: err.message });
});

// Definindo a porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
