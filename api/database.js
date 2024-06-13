const mongoose = require('mongoose');

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DATABASE = process.env.MONGO_DATABASE;

//const mongoURL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;

const mongoURL = `mongodb://localhost:27017`;

async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoURL);
    console.log('Conexão com o MongoDB estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
}

module.exports = connectToMongoDB;
