const mongoose = require('mongoose');

const RegisterType = {
    ITINERARY_STEP: "ITINERARY_STEP",
    DIARY_PAGE: "DIARY_PAGE",
    BLOG_POST: "BLOG_POST",
  }
  

const registerSchema = new mongoose.Schema({
    data_criacao: {
        type: Date,
        required: true
    },
    data_atualizacao: {
        type: Date,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    deleted: { type: Boolean, default: false },
    tipo: {
        type: String,
        enum: Object.values(RegisterType),
        required: true,
      },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

const Register = mongoose.model('Register', registerSchema);

module.exports = Register.collection;
