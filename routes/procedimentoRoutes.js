const express = require('express');
const Procedimento = require('../models/Procedimento');
const router = express.Router();

// Rota para criar um novo procedimento
router.post('/', async (req, res) => {
  try {
    const novoProcedimento = new Procedimento(req.body);
    await novoProcedimento.save();
    res.status(201).json(novoProcedimento);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao cadastrar procedimento', error });
  }
});

// Rota para buscar todos os procedimentos
router.get('/', async (req, res) => {
  try {
    const procedimentos = await Procedimento.find();
    res.json(procedimentos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar procedimentos', error });
  }
});

// Rota para atualizar um procedimento pelo ID
router.put('/:id', async (req, res) => {
  try {
    const procedimentoAtualizado = await Procedimento.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Retorna o procedimento atualizado
    );
    if (!procedimentoAtualizado) {
      return res.status(404).json({ message: 'Procedimento não encontrado' });
    }
    res.json(procedimentoAtualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar procedimento', error });
  }
});

// Rota para deletar um procedimento pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const procedimentoDeletado = await Procedimento.findByIdAndDelete(req.params.id);
    if (!procedimentoDeletado) {
      return res.status(404).json({ message: 'Procedimento não encontrado' });
    }
    res.json({ message: 'Procedimento deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar procedimento', error });
  }
});

module.exports = router;
