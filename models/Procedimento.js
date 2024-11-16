const mongoose = require('mongoose');

const ProcedimentoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  cor: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Procedimento', ProcedimentoSchema);
