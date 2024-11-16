const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nome_completo: { type: String, required: true },
  email: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  data_nascimento: { type: Date, required: true },
  telefone_celular: { type: String, required: true },
  endereco: {
    rua: { type: String, required: true },
    numero: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
  },
  fumante: { type: String, required: true },
  autorizacao_tratamento: { type: Boolean, required: true },
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;
