// const produtosController = require("../controller/produtos");

// const express = require("express");
// const router = express.Router();


// // adicionar produto
// router.post("/adiconar", (req,res) => {
//     const produto = req.body;

//     res.send(`Produtop adicionado: ${JSON.stringify(produto)}`)
// });

// listar produtos
// router.get("/", produtosController.listarProdutos);

const express = require("express");
const router = express.Router();
const { adicionarProduto } = require("../controller/produtos");

// Rota para manipular os produtos
router.post("/adicionar", adicionarProduto);

module.exports = router;
