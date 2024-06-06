const { hashPassword } = require('../controllers/utils');
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  dataNascimento: { type: Date, required: true },
  municipio: { type: String },
  uf: { type: String },
  telefone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  bio: { type: String },
  deleted: { type: Boolean, default: false }
});

usuarioSchema.pre('save', async function (next) {
  if (this.isModified('senha')) {
    this.senha = await hashPassword(this.senha);
  }
  next();
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
