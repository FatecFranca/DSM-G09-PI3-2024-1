const express = require('express');
const routes = require('./routes');
const connectToMongoDB = require('./database/connect');

connectToMongoDB();

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
