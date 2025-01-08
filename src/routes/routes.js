const express = require("express");
const router = express.Router();
const { adicionarProduto, listarProdutos } = require("../controller/produtos");

// Rota para manipular os produtos
router.post("/adicionar", adicionarProduto);
router.get("/", listarProdutos)

module.exports = router;
