const mongoose = require('mongoose');
const { registerSchema, RegisterType } = require('./base-register');    

const itinerarySchema = new mongoose.Schema({
  ...registerSchema.obj,
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
itinerarySchema.pre('save', function(next) {
    this.tipo = RegisterType.ITINERARY_STEP;
    next();
  });

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary; 
