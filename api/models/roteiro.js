const mongoose = require('mongoose');

const { Register } = require('./base-register');

const itinerarySchema = new mongoose.Schema({
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
  ],
});

const Itinerary = Register.discriminator('Itinerary', itinerarySchema);

module.exports = Itinerary;
