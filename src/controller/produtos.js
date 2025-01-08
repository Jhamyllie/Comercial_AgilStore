const fs = require("fs");
const path = require("path");
// Caminho de acesso ao arquivo de dados
const dataPath = path.join(__dirname, "../../data/produtos.json");

// adiconar produto
const adicionarProduto = (req, res) => {
    try {
      const { NomeProduto, Categoria, QuantidadeEstoque, Preco } = req.body;

      if (!NomeProduto || !Categoria || !QuantidadeEstoque || !Preco) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
      }

      const produtos = JSON.parse(fs.readFileSync(dataPath, "utf8"));

      const novoID = produtos.length > 0 ? parseInt(produtos[produtos.length - 1].ID) + 1 : 1;
  
      const novoProduto = {
        ID: novoID.toString(),
        NomeProduto,
        Categoria,
        QuantidadeEstoque: QuantidadeEstoque.toString(),
        Preco: Preco.toString(),
      };
      produtos.push(novoProduto);
  
      fs.writeFileSync(dataPath, JSON.stringify(produtos, null, 2));
  
      res.status(201).json({ message: "Produto adicionado com sucesso!", produto: novoProduto });
    } catch (error) {
      res.status(500).json({ message: "Erro ao adicionar o produto", error });
    }
};

// listar produtos

const listarProdutos = (req, res) => {
    try {
      const produtos = JSON.parse(fs.readFileSync(dataPath, "utf8"));
      res.status(200).json(produtos);
    } catch (error) {
      res.status(500).json({ message: "Erro ao carregar os produtos", error });
    }
}
// atualizar produtos

// excluir produtos

// buscar produto pelo id ou nome


module.exports = {
  adicionarProduto,
  listarProdutos
};

