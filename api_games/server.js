const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB - api_games"))
  .catch(err => console.error("Erro ao conectar:", err));

// Rotas
const jogoRoutes = require('./routes/jogos');
app.use("/jogos", jogoRoutes);

// Rota padrão
app.get("/", (req, res) => {
  res.json({ mensagem: "API de Jogos - CRUD completo" });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));