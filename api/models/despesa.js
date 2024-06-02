const mongoose = require('mongoose');
const TipoDespesa = {
  ESTADIA: "Estadia",
  ALIMENTACAO: "Alimentação",
  TRANSPORTE: "Transporte",
  PASSEIO_ATIVIDADE: "Passeio/Atividade",
  ENTRADA: "Entrada",
  OUTROS: "Outros",
};

const expenseSchema = new mongoose.Schema({
  valor: {
    type: Number,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  tipoDespesa: {
    type: String,
    enum: Object.values(TipoDespesa),
    required: true,
  },
  roteiroId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Itinerary',
  },
});


const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense.collection;
