const mongoose = require('mongoose');

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
    url_imagem: Array,
    local: String,
    valor_gasto: Number,
    publico: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

const Register = mongoose.model('Register', registerSchema);

module.exports = Register.collection;
