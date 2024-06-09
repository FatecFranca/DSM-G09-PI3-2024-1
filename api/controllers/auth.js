const { comparePassword } = require('./utils');
const Usuario = require('../models/usuario');
const mongoose = require('mongoose');

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

    const tokens = user.generateAuthToken();
    const { accesstoken, refreshtoken } = tokens;

    if (!user.refreshtokens.includes(refreshtoken)) {
      await user.updateOne({ $push: { refreshtokens: refreshtoken } });
    }

    res.status(200).json({
      token: accesstoken,
      refreshToken: refreshtoken,
      usuario: user,
    });

  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
}

async function refreshAuthToken(req, res) {
  try {
    const { refreshToken } = req.body;

    const validatedUser = await validarRefreshToken(req.body.usuario, refreshToken);
    if (!validatedUser) {
      return res.status(401).json({ error: "Refresh token inválido" });
    }

    const novosTokens = validatedUser.generateAuthToken();
    const { accesstoken, refreshtoken } = novosTokens;

    await Usuario.findOneAndUpdate(
      { _id: validatedUser._id },
      { $addToSet: { refreshtokens: refreshtoken } },
      { new: false }
    );

    res.status(200).json({ refreshToken: refreshtoken });
  } catch (error) {
    console.error('Erro ao atualizar token:', error);
    res.status(500).json({ error: 'Erro ao atualizar token' });
  }
}

async function validarRefreshToken(userId, refreshToken) {
  console.log(userId, refreshToken)
  const user = await Usuario.findOne({ _id: userId });
  if (!user) {
    return false;
  }

  const foundRefreshToken = user.refreshtokens.find((token) => token === refreshToken);
  if (!foundRefreshToken) {
    return false;
  }

  return user;
}

async function logout(req, res) {
  try {
    const { refreshToken } = req.body;

    const usuario = await Usuario.findOne({ refreshtokens: refreshToken });
    if (!usuario) {
      return res.status(200).json({ message: 'Logout efetuado (token já removido)' });
    }

    const userIndex = usuario.refreshtokens.indexOf(refreshToken);
    if (userIndex !== -1) {
      usuario.refreshtokens.splice(userIndex, 1);
    }

    await usuario.save();

    res.status(200).json({ message: 'Logout efetuado' });
  } catch (error) {
    console.error('Erro ao realizar logout:', error);
    res.status(500).json({ error: 'Erro ao realizar logout' });
  }
}

module.exports = {
  login,
  refreshAuthToken,
  validarRefreshToken,
  logout,
};
