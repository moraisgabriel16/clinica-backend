const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
  pacienteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente',
    required: true,
  },
  dentistaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dentista',
    required: true,
  },
  procedimentoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Procedimento',
    required: true,
  },
  dataHora: {
    type: Date,
    required: true,
  },
  observacoes: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Agendamento', AgendamentoSchema);
