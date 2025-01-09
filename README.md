# Comercial_AgilStore
## Gerenciamento de Produtos

## Descrição

A aplicação **Gerenciamento de Produtos** foi desenvolvida para otimizar o controle do inventário da **AgilStore**, uma loja de eletrônicos que recentemente expandiu seu catálogo. A ferramenta facilita a gestão automatizada do inventário, permitindo adicionar, listar, atualizar, excluir e buscar produtos, garantindo maior eficiência e precisão na administração de estoque.


## Funcionalidades

- **Adicionar Produto**: Permite adicionar novos produtos ao inventário, solicitando informações como nome, categoria, quantidade em estoque e preço. Um id único é gerado automaticamente para cada produto.

- **Listar Produtos**: Exibe uma tabela com todos os produtos cadastrados, permitindo a filtragem por categoria e ordenação por nome, quantidade ou preço. Pode ser feito por meio da query `categoria`, `ordenarPor` e `ordem`.

- **Atualizar Produto**: Permite atualizar as informações de um produto existente através do id. O usuário pode modificar os campos nome, categoria, quantidade e preço.

- **Excluir Produto**: Permite excluir um produto do inventário, confirmando a ação antes de removê-lo. Para confirmar a exclusão, o usuário precisa enviar `"sim"` no corpo da requisição.

- **Buscar Produto**: Permite buscar um produto pelo id ou nome, exibindo suas informações detalhadas. Caso o produto não seja encontrado, uma mensagem informando isso será exibida.

## Estrutura do Projeto
```
📂 AGILSTORE
├── 📂 data
│   └── 📄 produtos.json
├── 📂 node_modules
├── 📂 src
│   ├── 📂 controller
│   │   └── 📄 produtos.js
│   ├── 📂 routes
│   │   └── 📄 routes.js
├── 📄 app.js
├── 📄 .gitignore
├── 📄 image.png
├── 📄 index.js
├── 📄 package-lock.json
├── 📄 package.json
└── 📄 README.md

```


## Endpoints da API

### 1. Adicionar Produto

- **POST** `/produtos/adicionar`
- **Body**: 
    ```json
    {
        "NomeProduto": "Smartphone X",
        "Categoria": "Smartphones",
        "QuantidadeEstoque": 20,
        "Preco": 1500.00
    }
    ```

### 2. Listar Produtos

- **GET** `/produtos`
- **Query Params**: 
    - `categoria` (opcional) 
    - `ordenarPor` (opcional: "NomeProduto", "QuantidadeEstoque", "Preco")
    - `ordem` (opcional: "asc", "desc")

### 3. Atualizar Produto

- **PUT** `/produtos/:id`
- **Body**: 
    ```json
    {
        "NomeProduto": "Smartphone Y",
        "Categoria": "Smartphones",
        "QuantidadeEstoque": 10,
        "Preco": 1200.00
    }
    ```

### 4. Excluir Produto

- **DELETE** `/produtos/:id`
- **Body**: 
    ```json
    {
        "confirmacao": "sim"
    }
    ```

### 5. Buscar Produto

- **GET** `/produtos/buscar`
- **Query Params**: 
    - `id` (opcional)
    - `nome` (opcional)

## Persistência de Dados

Todos os dados são salvos automaticamente em um arquivo JSON, garantindo que as informações do inventário não sejam perdidas ao encerrar a aplicação.

## Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/api/)**: Plataforma utilizada para o desenvolvimento da aplicação.
- **[Express](https://expressjs.com/)**: Framework utilizado para estruturar as rotas da API.
- **[Insomnia](https://docs.insomnia.rest/)/[Postman](https://learning.postman.com/)**: Ferramentas utilizadas para testar e manipular a API.

## Instruções de como rodar o projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/Jhamyllie/Comercial_AgilStore

2. Navegue até o diretório do projeto:
    ```bash
    cd agilstore

3. Instale as dependências:

    ```bash
    npm install

4. Para rodar a aplicação, use o comando:

    ```bash
    npm run dev

## Como Usar
1. Ao iniciar a aplicação, a API estará disponível na porta 3000.
2. Para interagir com a API, você pode usar o Insomnia ou o Postman para enviar as requisições de acordo com os endpoints descritos acima.

## Contribuição
Contribuições são bem-vindas! Se você tiver sugestões ou correções, fique à vontade para abrir uma issue ou enviar um pull request.


