const mongoose = require('mongoose');
const { Register } = require('./base-register');

const blogPostSchema = new mongoose.Schema({
    publico: {
        type: Boolean,
        default: false
    },
    data_publicacao: {
        type: Date
    },
    urls_imagem:[{
        type: String
    }],
    local: {
        type: String,
    },
    gasto: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense',
    }],
})

const BlogPost = Register.discriminator('BlogPost', blogPostSchema);

module.exports = BlogPost;