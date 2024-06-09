const { ObjectId } = require('mongodb');
const Itinerary = require('../models/roteiro');
const ItineraryStep = require('../models/etapa-roteiro');

async function createStep(req, res) {
  try {
    const itineraryID = req.params.itineraryID;
    const step = req.body;

    step.roteiroId = itineraryID;
    step.data_criacao = Date.now();
    step.data_atualizacao = step.data_criacao;
    const newStep = new ItineraryStep(step);
    const savedStep = await newStep.save();

    console.info('Etapa criada com sucesso!');
    res.status(201).json(savedStep);
  } catch (error) {
    console.error('Erro ao criar etapa:', error);
    res.status(500).json({ error: 'Erro ao criar etapa' });
  }
}

async function listSteps(req, res) {
  try {
    const itineraryID = req.params.itineraryID;

    const steps = await ItineraryStep.find({ roteiroId: itineraryID, deleted: false });
    console.info(steps);
    res.status(200).json(steps);
  } catch (error) {
    console.error('Erro ao listar etapas:', error);
    res.status(500).json({ error: 'Erro ao listar etapas' });
  }
}

async function getStepById(req, res) {
  try {
    const stepID = req.params.stepID;

    const step = await ItineraryStep.findById(stepID);
    if (!step || step.deleted) {
      return res.status(404).json({ message: 'Etapa não encontrada' });
    }
    res.status(200).json(step);
  } catch (error) {
    console.error('Erro ao obter etapa por ID:', error);
    res.status(500).json({ error: 'Erro ao obter etapa por ID' });
  }
}

async function updateStep(req, res) {
  try {
    const stepID = req.params.stepID;
    const updatedStep = req.body;
    updatedStep.data_atualizacao = Date.now();

    let existingStep = await ItineraryStep.findById(stepID);
    if (!existingStep) {
      return res.status(404).json({ message: 'Etapa não encontrada' });
    }

    if (req.method === 'DELETE') {
      existingStep.deleted = true;
    } else {
      existingStep = Object.assign(existingStep, { ...updatedStep });
    }

    const updatedDoc = await existingStep.save();
    res.status(200).json(updatedDoc);
  } catch (error) {
    console.error('Erro ao atualizar etapa:', error);
    res.status(500).json({ error: 'Erro ao atualizar etapa' });
  }
}

module.exports = {
  createStep,
  listSteps,
  getStepById,
  updateStep,
};
