const express = require("express");
const router = express.Router();
const Jogo = require("../models/Jogo");

// GET - Listar todos os jogos
router.get("/", async (req, res) => {
  try {
    const jogos = await Jogo.find().sort({ data_criacao: -1 });
    res.json(jogos);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar jogos" });
  }
});

// GET - Buscar jogo por ID
router.get("/:id", async (req, res) => {
  try {
    const jogo = await Jogo.findById(req.params.id);
    if (!jogo) {
      return res.status(404).json({ erro: "Jogo não encontrado" });
    }
    res.json(jogo);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar jogo" });
  }
});

// POST - Criar novo jogo
router.post("/", async (req, res) => {
  try {
    const { nome, categoria, preco, estoque } = req.body;
    
    // Validação simples
    if (!nome || !categoria || preco === undefined || estoque === undefined) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    const jogo = new Jogo({
      nome,
      categoria,
      preco,
      estoque
    });

    await jogo.save();
    res.status(201).json(jogo);
  } catch (erro) {
    res.status(400).json({ erro: "Erro ao criar jogo" });
  }
});

// PUT - Atualizar jogo por ID
router.put("/:id", async (req, res) => {
  try {
    const jogoAtualizado = await Jogo.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!jogoAtualizado) {
      return res.status(404).json({ erro: "Jogo não encontrado" });
    }
    
    res.json(jogoAtualizado);
  } catch (erro) {
    res.status(400).json({ erro: "Erro ao atualizar jogo" });
  }
});

// DELETE - Remover jogo por ID
router.delete("/:id", async (req, res) => {
  try {
    const jogoRemovido = await Jogo.findByIdAndDelete(req.params.id);
    
    if (!jogoRemovido) {
      return res.status(404).json({ erro: "Jogo não encontrado" });
    }
    
    res.json({ 
      mensagem: "Jogo removido com sucesso!",
      jogo: jogoRemovido 
    });
  } catch (erro) {
    res.status(400).json({ erro: "Erro ao remover jogo" });
  }
});

module.exports = router;