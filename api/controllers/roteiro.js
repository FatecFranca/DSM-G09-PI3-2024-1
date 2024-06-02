const Itinerary = require('../models/roteiro');
const { ObjectId } = require('mongodb');
const Usuario = require('../models/usuario');
const { exists, retrieve, upsert, retrieveAll } = require('../database/general');
const USER_COLLECTION = Usuario;

async function createItinerary(req, res) {
    const itinerary = req.body;
    user = new ObjectId(itinerary.usuario)
    itinerary.usuario = user
    itinerary.data_criacao = new Date();
    try {
        if (!await exists(USER_COLLECTION, "_id", user)) {
            console.error('Usuário não encontrado');
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        const result = await upsert(Itinerary.collection, itinerary);
        console.info(result);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao criar roteiro:', error);
        res.status(500).json({ error: 'Erro ao criar roteiro' });
    }
}

async function listItinerariesByUser(req, res) {
    const userID = req.body.usuario;

    if (!userID) {
        return res.status(400).json({ error: 'ID do usuario não fornecido' });
    }

    try {
        const itineraries = await retrieveAll(Itinerary.collection, "usuario", new ObjectId(userID));
        if (!itineraries) {
            return res.status(404).json({ error: 'Roteiros não encontrados' });
        }
        console.log(itineraries)
        res.status(200).json(itineraries);
    } catch (error) {
        console.error('Erro ao buscar roteiros:', error);
        res.status(500).json({ error: 'Erro ao buscar roteiros' });
    }
}


async function getItineraryById(req, res) {
    const itineraryID = req.params.itineraryID;

    if (!itineraryID) {
        return res.status(400).json({ error: 'ID do roteiro não fornecido' });
    }

    try {
        const itinerary = await retrieve(Itinerary.collection, "_id", new ObjectId(itineraryID));
        if (!itinerary || itinerary.deleted) {
            return res.status(404).json({ error: 'Roteiro não encontrado' });
        }
        res.status(200).json(itinerary);
    } catch (error) {
        console.error('Erro ao buscar roteiro:', error);
        res.status(500).json({ error: 'Erro ao buscar roteiro' });
    }
}

async function updateItinerary(req, res) {
    const itineraryID = req.params.itineraryID;

    if (!itineraryID) {
        return res.status(400).json({ message: "ID do Roteiro não fornecido" });
    }

    const updatedItinerary = req.body;

    try {
        let existingItinerary = await retrieve(Itinerary.collection, "_id", new ObjectId(itineraryID));
        if (!existingItinerary) {
            return res.status(404).json({ error: 'Roteiro não encontrado' });
        }
        if (req.method === 'DELETE') {
            existingItinerary.deleted = true;
        } else {
            Object.assign(existingItinerary, updatedItinerary);
        }
        const result = await upsert(Itinerary.collection, existingItinerary);
        res.status(200).json(result);
    } catch (error) {
        console.error("Erro ao atualizar roteiro:", error);
        res.status(500).json({ message: "Erro ao atualizar roteiro" });
    }
}

module.exports = {
    createItinerary,
    listItinerariesByUser,
    getItineraryById,
    updateItinerary,
};
