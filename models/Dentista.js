const mongoose = require('mongoose');

const DentistaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Dentista', DentistaSchema);
