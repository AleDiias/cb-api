const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

require('./train');
require('./intents');
require('./rasa')

const uttersRoutes = require('./utters');
app.use('/utters', uttersRoutes);

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});