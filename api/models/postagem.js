const mongoose = require('mongoose');
const { Register } = require('./base-register');

const ratingSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  avaliacao: { type: Number, required: true, min: 1, max: 5 },
  data_avaliacao: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema({
  texto: { type: String, required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  data_criacao: { type: Date, required: true },
  data_atualizacao: { type: Date, required: true },
    respostas: [commentSchema]
});

const blogPostSchema = new mongoose.Schema({
  publico: {
    type: Boolean,
        default: false
  },
  data_publicacao: {
        type: Date
  },
  urls_imagem: [{
        type: String
  }],
  local: {
    type: String,
  },
  gasto: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expense',
  }],
  comentarios: [commentSchema],
  avaliacoes: [ratingSchema],
  avaliacao_media: {
    type: Number,
    default: 0,
  },
});

blogPostSchema.pre('save', async function (next) {
  if (this.isModified('avaliacoes')) {
    const ratingsSum = this.avaliacoes.reduce((sum, rating) => sum + rating.avaliacao, 0);
    const averageRating = ratingsSum / this.avaliacoes.length;
    this.avaliacao_media = averageRating;
  }
  next();
});

const BlogPost = Register.discriminator('BlogPost', blogPostSchema);

module.exports = BlogPost;
