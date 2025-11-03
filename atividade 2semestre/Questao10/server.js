const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/rede_games')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar:', err));

const Produto = mongoose.model('Produto', new mongoose.Schema({}, { strict: false }));

app.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.find({}, { nome: 1, preco: 1, _id: 0 }).limit(5);
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});