const express = require('express');
const router = express.Router();
const HorarioDeFuncionamento = require('../models/HorarioDeFuncionamento');

// Adicionar ou atualizar horário de funcionamento
router.post('/', async (req, res) => {
  try {
    const { dia, abertura, fechamento } = req.body;

    // Atualizar horário existente ou criar um novo
    let horario = await HorarioDeFuncionamento.findOne({ dia });
    if (horario) {
      horario.abertura = abertura;
      horario.fechamento = fechamento;
      await horario.save();
    } else {
      horario = new HorarioDeFuncionamento({ dia, abertura, fechamento });
      await horario.save();
    }

    res.status(200).json(horario);
  } catch (error) {
    console.error('Erro ao salvar horário de funcionamento:', error);
    res.status(400).json({ error: 'Erro ao salvar horário de funcionamento.' });
  }
});

// Obter horários de funcionamento
router.get('/', async (req, res) => {
  try {
    const horarios = await HorarioDeFuncionamento.find();
    res.status(200).json(horarios);
  } catch (error) {
    console.error('Erro ao buscar horários de funcionamento:', error);
    res.status(400).json({ error: 'Erro ao buscar horários de funcionamento.' });
  }
});

module.exports = router;
