const express = require('express');
const Paciente = require('../models/Paciente');

const router = express.Router();

// Rota para buscar todos os pacientes
router.get('/', async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pacientes', error });
  }
});

// Rota para buscar os detalhes de um paciente pelo ID
router.get('/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id);
    if (!paciente) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar paciente', error });
  }
});

// Rota para criar um novo paciente
router.post('/', async (req, res) => {
  try {
    const novoPaciente = new Paciente(req.body);
    await novoPaciente.save();
    res.status(201).json(novoPaciente);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao cadastrar paciente', error });
  }
});

// Rota para atualizar um paciente pelo ID
router.put('/:id', async (req, res) => {
  try {
    const pacienteAtualizado = await Paciente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Retorna o paciente atualizado
    );
    if (!pacienteAtualizado) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }
    res.json(pacienteAtualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar paciente', error });
  }
});

// Rota para deletar um paciente pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const pacienteDeletado = await Paciente.findByIdAndDelete(req.params.id);
    if (!pacienteDeletado) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }
    res.json({ message: 'Paciente deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar paciente', error });
  }
});

module.exports = router;
