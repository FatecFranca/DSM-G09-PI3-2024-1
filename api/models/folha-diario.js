const mongoose = require('mongoose');
const { Register } = require('./base-register');

const journalRecordSchema = new mongoose.Schema({
    local: {
        type: String,
        required: true,
    },
    gasto: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense',
    }],
    roteiroId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Itinerary',
      required: true,
    },
    urls_imagem:[{
        type: String
    }]
})

const JournalRecord = Register.discriminator('JournalRecord', journalRecordSchema);

module.exports = JournalRecord;