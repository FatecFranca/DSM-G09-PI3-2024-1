const express = require('express');
const routes = require('./routes');
const connectToMongoDB = require('./database')
require('dotenv').config();

connectToMongoDB();

if (!process.env.ACCESS_SECRET_KEY || !process.env.REFRESH_SECRET_KEY) {
  console.error('Error: Missing required environment variables. Set ACCESS_SECRET_KEY and REFRESH_SECRET_KEY.');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', routes);

app.use((req, res, next) => {
  res.status(404).send('Rota não encontrada');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
