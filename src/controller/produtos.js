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
const atualizarProduto = (req, res) => {
    try {
        const { id } = req.params;
        const{ NomeProduto, Categoria, QuantidadeEstoque, Preco } = req.body;

        const produtos = JSON.parse(fs.readFileSync(dataPath, "utf8"));

        const produtoIndex = produtos.findIndex((item) => item.ID === id);
        if(produtoIndex < 0){
            return res.status(404).json({message: "Produto não encontrado"});
        }

        const produto = produtos[produtoIndex];

        if(NomeProduto){
            if(NomeProduto.trim() === ""){
                return res.status(400).json({message: "Nome do produto não pode está vazio"})
            }
            produto.NomeProduto = NomeProduto;
        }

        if(Categoria){
            if(Categoria.trim() === ""){
                return res.status(400).json({message: "Categoria não pode está vazia"})
            }
            produto.Categoria = Categoria;
        }

        if(QuantidadeEstoque){
            const quantidade = parseInt(QuantidadeEstoque, 10)
            if(isNaN(quantidade) || quantidade < 0){
                return res.status(400).json({message: "Quantidade em estoque deve ser um número válido e maior ou igual a zero"});
            }
            produto.QuantidadeEstoque = quantidade.toString();
        }

        if (Preco) {
            const precoFloat = parseFloat(Preco);
            if (isNaN(precoFloat) || precoFloat <= 0) {
              return res.status(400).json({ message: "Preço deve ser um número válido e maior que zero." });
            }
            produto.Preco = `R$ ${precoFloat.toFixed(2).replace(".", ",")}`;
        }

        produtos[produtoIndex] = produto;
        fs.writeFileSync(dataPath, JSON.stringify(produtos, null, 2));

        res.status(200).json({
            message: "Produto atualizado com sucesso!",
            produto,
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar produto. Tente novamente.", error });
    }
}

// excluir produtos
const deletarProduto = (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Insira o ID do produto." });
        }

        const produtos = JSON.parse(fs.readFileSync(dataPath, "utf8"));

        const produtoIndex = produtos.findIndex((produto) => produto.ID === id);
        if (produtoIndex === -1) {
        return res.status(404).json({ message: `Produto com ID ${id} não foi encontrado.` });
        }

        const produto = produtos[produtoIndex];

        produtos.splice(produtoIndex, 1);

        fs.writeFileSync(dataPath, JSON.stringify(produtos, null, 2));

        res.status(200).json({
            message: `O produto ${produto.NomeProduto}, (ID: ${id}) foi removido com sucesso!`
        });

    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir o produto. Tente novamente.", error });
    }
}

// buscar produto pelo id ou nome
const buscarProduto = (req, res) => {
    try {
        const { id, nome } = req.query;
  
        if (!id && !nome) {
            return res.status(400).json({
            message: "Por favor, forneça o ID ou parte do nome do produto para buscar.",
            });
        }
    
        const produtos = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    
        let resultado;
    
        if (id) {
            // Buscar por ID
            resultado = produtos.find((produto) => produto.ID === id);
        } else if (nome) {
            // Buscar por parte do nome (ignorar maiúsculas e minúsculas)
            resultado = produtos.filter((produto) =>
            produto.NomeProduto.toLowerCase().includes(nome.toLowerCase())
            );
        }
    
        if (!resultado || (Array.isArray(resultado) && resultado.length === 0)) {
            return res.status(404).json({
            message: "Nenhum produto encontrado com os critérios fornecidos.",
            });
        }

        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar o produto", error: error.message });
    }
};
  

module.exports = {
  adicionarProduto,
  listarProdutos,
  atualizarProduto,
  deletarProduto,
  buscarProduto
};

