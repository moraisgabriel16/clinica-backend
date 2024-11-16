const mongoose = require('mongoose');

const HorarioDeFuncionamentoSchema = new mongoose.Schema({
  dia: {
    type: String,
    required: true,
  },
  abertura: {
    type: String,
    required: true,
  },
  fechamento: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('HorarioDeFuncionamento', HorarioDeFuncionamentoSchema);
