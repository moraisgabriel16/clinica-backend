const express = require('express');
const Dentista = require('../models/Dentista');
const router = express.Router();

// Rota para criar um novo dentista
router.post('/', async (req, res) => {
  try {
    const novoDentista = new Dentista(req.body);
    await novoDentista.save();
    res.status(201).json(novoDentista);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao cadastrar dentista', error });
  }
});

// Rota para buscar todos os dentistas
router.get('/', async (req, res) => {
  try {
    const dentistas = await Dentista.find();
    res.json(dentistas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar dentistas', error });
  }
});

// Rota para atualizar um dentista pelo ID
router.put('/:id', async (req, res) => {
  try {
    const dentistaAtualizado = await Dentista.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Retorna o dentista atualizado
    );
    if (!dentistaAtualizado) {
      return res.status(404).json({ message: 'Dentista não encontrado' });
    }
    res.json(dentistaAtualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar dentista', error });
  }
});

// Rota para deletar um dentista pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const dentistaDeletado = await Dentista.findByIdAndDelete(req.params.id);
    if (!dentistaDeletado) {
      return res.status(404).json({ message: 'Dentista não encontrado' });
    }
    res.json({ message: 'Dentista deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar dentista', error });
  }
});

module.exports = router;
