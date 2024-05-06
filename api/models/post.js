const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
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

const Post = mongoose.model('Post', postSchema);

module.exports = Post.collection;
