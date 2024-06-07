const { comparePassword } = require('../controllers/utils');
const { sign } = require('jsonwebtoken');
const Usuario = require('../models/usuario');

async function login(req, res) {
  try {
    const { login, senha } = req.body;

    const user = await Usuario.findOne({ $or: [{ email: login }, { cpf: login }] });
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado ou senha incorreta' });
    }

    const isPasswordValid = await comparePassword(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Usuário não encontrado ou senha incorreta' });
    }

    const payload = {
      userId: user._id,
      nome: user.nome,
      email: user.email,
    };

    const token = sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      token: token,
      usuario: user,
    });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
}

module.exports = {
  login,
};
