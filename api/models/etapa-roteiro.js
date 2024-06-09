const mongoose = require('mongoose');
const { Register } = require('./base-register');

const itineraryStepSchema = new mongoose.Schema({
  local: {
    type: String,
    required: true,
  },
  roteiroId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Itinerary',
  },
  previsaoGasto: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expense',
  }],
});

const ItineraryStep = Register.discriminator('ItineraryStep', itineraryStepSchema);

module.exports = ItineraryStep;
