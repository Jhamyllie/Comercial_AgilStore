const express = require("express");
const router = express.Router();
const { adicionarProduto, 
    listarProdutos, 
    atualizarProduto, 
    deletarProduto, 
    buscarProduto 
} = require("../controller/produtos");

// Rota para manipular os produtos
router.post("/adicionar", adicionarProduto);
router.get("/", listarProdutos);
router.put("/:id", atualizarProduto);
router.delete("/:id", deletarProduto);
router.get("/buscar", buscarProduto);

module.exports = router;
