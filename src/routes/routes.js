const express = require("express");
const router = express.Router();
const { adicionarProduto, listarProdutos, atualizarProduto, deletarProduto } = require("../controller/produtos");

// Rota para manipular os produtos
router.post("/adicionar", adicionarProduto);
router.get("/", listarProdutos);
router.put("/:id", atualizarProduto);
router.delete("/:id", deletarProduto);

module.exports = router;
