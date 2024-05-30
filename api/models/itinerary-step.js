const mongoose = require('mongoose');
const registerSchema = require('../base-register');
const Expense = require('./expense');

const itineraryStepSchema = new mongoose.Schema({
  ...registerSchema.obj,
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
  tipo: {
    type: String,
    default: registerSchema.RegisterType.ITINERARY_STEP,
    required: true,
  },
});

const ItineraryStep = mongoose.model('Register', itineraryStepSchema);

module.exports = ItineraryStep;
