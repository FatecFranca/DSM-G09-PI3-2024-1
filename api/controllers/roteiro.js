const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const Itinerary = require('../models/roteiro');

async function createItinerary(req, res) {
  const itinerary = req.body;
  itinerary['data_criacao'] = Date.now();
  itinerary['data_atualizacao'] = itinerary.data_criacao;
  const newItinerary = new Itinerary(itinerary);

  try {
    await newItinerary.save();
        console.info('Roteiro criado com sucesso!');
    res.status(201).json(newItinerary);
  } catch (error) {
    console.error('Erro ao criar roteiro:', error);
    res.status(500).json({ error: 'Erro ao criar roteiro' });
  }
}

async function listItinerariesByUser(req, res) {
  const userID = req.body.usuario;
  if (!userID) return res.status(400).json({ error: 'ID do usuário não fornecido' });

  try {
    const itineraries = await Itinerary.find({ usuario: new ObjectId(userID), deleted: false });
    if (!itineraries.length) return res.status(404).json({ error: 'Roteiros não encontrados' });
    res.status(200).json(itineraries);
  } catch (error) {
    console.error('Erro ao buscar roteiros:', error);
    res.status(500).json({ error: 'Erro ao buscar roteiros' });
  }
}

async function getItineraryById(req, res) {
  const itineraryID = req.params.itineraryID;
  if (!itineraryID) return res.status(400).json({ error: 'ID do roteiro não fornecido' });

  try {
    const itinerary = await Itinerary.findById(itineraryID);
    if (!itinerary || itinerary.deleted) return res.status(404).json({ error: 'Roteiro não encontrado' });
    res.status(200).json(itinerary);
  } catch (error) {
    console.error('Erro ao buscar roteiro:', error);
    res.status(500).json({ error: 'Erro ao buscar roteiro' });
  }
}

async function updateItinerary(req, res) {
  const itineraryID = req.params.itineraryID;
  const updatedItinerary = req.body;
  updatedItinerary['data_atualizacao'] = Date.now();

  if (!itineraryID) return res.status(400).json({ error: 'ID do roteiro não fornecido' });

  try {
    let existingItinerary = await Itinerary.findById(itineraryID);
    if (!existingItinerary) return res.status(404).json({ error: 'Roteiro não encontrado' });

    if (req.method === 'DELETE') {
      existingItinerary.deleted = true;
    } else {
      existingItinerary = Object.assign(existingItinerary, { ...updatedItinerary });
    }

    await existingItinerary.save();
    res.status(200).json(existingItinerary);
  } catch (error) {
    console.error('Erro ao atualizar roteiro:', error);
    res.status(500).json({ error: 'Erro ao atualizar roteiro' });
  }
}

module.exports = {
  createItinerary,
  listItinerariesByUser,
  getItineraryById,
  updateItinerary,
};
