const jwt = require('jsonwebtoken');
const { hashPassword } = require('../controllers/utils');
const mongoose = require('mongoose');
require('dotenv').config();

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
  refreshtokens: [String],
  deleted: { type: Boolean, default: false },
});

usuarioSchema.methods.generateAuthToken = function () {
  const accesstoken = jwt.sign(
    {
      _id: this._id,
      nome: this.nome,
      email: this.email,
    },
    process.env.ACCESS_SECRET_KEY,
    { expiresIn: '1h' }
  );
  const refreshtoken = jwt.sign(
    {
      _id: this._id,
      nome: this.nome,
      email: this.email,
    },
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: '1d' }
  );
  
  const tokens = { accesstoken: accesstoken, refreshtoken: refreshtoken };
  return tokens;
};

usuarioSchema.pre('save', async function (next) {
  if (this.isModified('senha')) {
    this.senha = await hashPassword(this.senha);
  }
  next();
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
