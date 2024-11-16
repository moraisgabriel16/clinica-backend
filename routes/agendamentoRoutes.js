const express = require("express");
const Agendamento = require("../models/Agendamento");
const Paciente = require("../models/Paciente");
const Dentista = require("../models/Dentista");
const Procedimento = require("../models/Procedimento");

const router = express.Router();

// Rota para criar um novo agendamento
router.post("/", async (req, res) => {
  try {
    const { pacienteId, dentistaId, procedimentoId, dataHora, horaInicio, horaFim, observacoes } = req.body;

    // Verificar se o paciente, dentista e procedimento existem
    const paciente = await Paciente.findById(pacienteId);
    if (!paciente) {
      return res.status(404).json({ message: "Paciente não encontrado" });
    }

    const dentista = await Dentista.findById(dentistaId);
    if (!dentista) {
      return res.status(404).json({ message: "Dentista não encontrado" });
    }

    const procedimento = await Procedimento.findById(procedimentoId);
    if (!procedimento) {
      return res.status(404).json({ message: "Procedimento não encontrado" });
    }

    // Criar novo agendamento
    const novoAgendamento = new Agendamento({
      pacienteId,
      dentistaId,
      procedimentoId,
      dataHora,
      horaInicio,
      horaFim,
      observacoes,
    });

    await novoAgendamento.save();
    res.status(201).json(novoAgendamento);
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    res.status(400).json({ message: "Erro ao criar agendamento", error: error.message });
  }
});

// Rota para buscar todos os agendamentos
router.get("/", async (req, res) => {
  try {
    const agendamentos = await Agendamento.find()
      .populate("pacienteId", "nome_completo")
      .populate("dentistaId", "nome")
      .populate("procedimentoId", "nome cor");
    res.json(agendamentos);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    res.status(500).json({ message: "Erro ao buscar agendamentos", error: error.message });
  }
});

// Rota para buscar um agendamento específico pelo ID
router.get("/:id", async (req, res) => {
  try {
    const agendamento = await Agendamento.findById(req.params.id)
      .populate("pacienteId", "nome_completo")
      .populate("dentistaId", "nome")
      .populate("procedimentoId", "nome cor");

    if (!agendamento) {
      return res.status(404).json({ message: "Agendamento não encontrado" });
    }
    res.json(agendamento);
  } catch (error) {
    console.error("Erro ao buscar agendamento:", error);
    res.status(500).json({ message: "Erro ao buscar agendamento", error: error.message });
  }
});

// Rota para atualizar um agendamento pelo ID
router.put("/:id", async (req, res) => {
  try {
    const { pacienteId, dentistaId, procedimentoId, dataHora, horaInicio, horaFim, observacoes } = req.body;

    // Verificar se o paciente, dentista e procedimento existem
    const paciente = await Paciente.findById(pacienteId);
    if (!paciente) {
      return res.status(404).json({ message: "Paciente não encontrado" });
    }

    const dentista = await Dentista.findById(dentistaId);
    if (!dentista) {
      return res.status(404).json({ message: "Dentista não encontrado" });
    }

    const procedimento = await Procedimento.findById(procedimentoId);
    if (!procedimento) {
      return res.status(404).json({ message: "Procedimento não encontrado" });
    }

    const agendamentoAtualizado = await Agendamento.findByIdAndUpdate(
      req.params.id,
      { pacienteId, dentistaId, procedimentoId, dataHora, horaInicio, horaFim, observacoes },
      { new: true, runValidators: true }
    )
      .populate("pacienteId", "nome_completo")
      .populate("dentistaId", "nome")
      .populate("procedimentoId", "nome cor");

    if (!agendamentoAtualizado) {
      return res.status(404).json({ message: "Agendamento não encontrado" });
    }
    res.json(agendamentoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar agendamento:", error);
    res.status(400).json({ message: "Erro ao atualizar agendamento", error: error.message });
  }
});

// Rota para deletar um agendamento pelo ID
router.delete("/:id", async (req, res) => {
  try {
    const agendamentoDeletado = await Agendamento.findByIdAndDelete(req.params.id);
    if (!agendamentoDeletado) {
      return res.status(404).json({ message: "Agendamento não encontrado" });
    }
    res.json({ message: "Agendamento deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar agendamento:", error);
    res.status(500).json({ message: "Erro ao deletar agendamento", error: error.message });
  }
});

module.exports = router;
