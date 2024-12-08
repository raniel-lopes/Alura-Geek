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

  // Envia o produto para a API via POST
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
    },
    body: JSON.stringify(novoProduto), // Converte o produto para uma string JSON
  })
    .then((response) => response.json()) // Converte a resposta em JSON
    .then((data) => {
      console.log("Produto adicionado:", data); // Log do produto adicionado
      carregarProdutos();
    })
    .catch((error) => {
      console.error("Erro ao adicionar o produto", error); // Exibe um erro caso algo dê errado
    });
};

// Função para remover um produto
const removerProduto = (id) => {
  fetch(`${apiUrl}/${id}`, {
    method: "DELETE", // Faz uma requisição DELETE para remover o produto
  })
    .then(() => {
      console.log("Produto removido"); // Log do produto removido
      carregarProdutos(); // Atualiza a lista de produtos
    })
    .catch((erro) => {
      console.error("Erro ao remover produto: ", error); // Exibe um erro caso algo dê errado
    });
};

// Evento de envio do formulário para adicionar produtos
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); // Impede o envio padrão do formulário

  const nome = document.getElementById("nome").value; // Pega o valor do campo de nome
  const valor = document.getElementById("valor").value; // Pega o valor do campo de valor
  const imagem = document.getElementById("imagem").files[0]; // Pega a imagem selecionada

  // Converte a imagem em uma URL base64 para exibir no frontend
  let imagemURL = "";
  if (imagem) {
    const reader = new FileReader();
    reader.onloadend = function () {
      imagemURL = reader.result;
      adicionarProduto(nome, valor, imagemURL); //Adiciona o produto após a conversão da imagem
    };
    reader.readAsDataURL(imagem); // Lê a imagem como URL base64
  } else {
    adicionarProduto(nome, valor, imagemURL); // Adiciona o produto mesmo sem imagem
  }
});

// Carrega os produtos ao carregar a página
window.addEventListener("load", carregarProdutos);
