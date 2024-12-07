// Definir a URL da API onde os produtos serão armazenados
const apiUrl = "http://localhost:3000/produtos"; // Altere para o endpoint da sua API

// Função para carregar os produtos da API e exibi-los na tela
const carregarProdutos = () => {
  fetch(apiUrl) // Faz uma requisição GET para buscar os produtos
    .then((response) => response.json()) // Converte a resposta em JSON
    .then((produtos) => {
      const listaProdutos = document.querySelector(".produtos-lista"); // Seleciona o contêiner dos produtos
      listaProdutos.innerHTML = ""; // Limpa a lista antes de recarregar

      produtos.forEach((produto) => {
        // Cria um card para cada produto
        const produtoCard = document.createElement("div");
        produtoCard.classList.add("produto-card"); // Adiciona a classe CSS

        // Insere o conteúdo do produto no card
        produtoCard.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <p>${produto.nome}</p>
            <div class="valor-container">
                <h4>$ ${produto.valor}</h4>
                <img src="./images/icon_trash.png" alt="Remover produto" class="lixeira" data-id="${produto.id}">
            </div>
            `;

        listaProdutos.appendChild(produtoCard); // Adiciona o card ao conteiner

        // Evento para a lixeira (remover o produto)
        const lixeira = produto.Card.querySelector(".lixeira");
        lixeira.addEventListener("click", () => {
          const id = lixeira.getAttribute("data-id"); // Pega o ID do produto
          removerProdutos(id); // Chama a função para remover os produtos da lista
        });
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar os produtos: ", error); // Exibe um erro caso algo dê errado
    });
};

// Função para adicionar um produto
const adicionarProduto = (nome, valor, imagem) => {
  const novoProduto = {
    nome: nome, // Nome do produto
    valor: valor, // Valor do produto
    imagem: imagem, // URL da imagem do produto
  };
};
