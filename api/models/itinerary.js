const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    titulo: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
    },
    pontosTuristicos: [
        {
            nome: {
                type: String,
            },
        },
    ],
    hospedagens: [
        {
            nome: {
                type: String,
            },
        },
    ],
    lugaresComer: [
        {
            nome: {
                type: String,
            },
        },
    ]
});


const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;
