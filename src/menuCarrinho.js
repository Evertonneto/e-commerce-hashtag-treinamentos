import { catalogo } from "./utilidades";

const idsProdutosCarrinhoComQuantidade = {};

function abrirCarrinho() {
  document
    .getElementById("carrinho")
    .classList.add("shadow-[0_35px_60px_-15px_rgba(255,255,255,0.5)]");
  document.getElementById("carrinho").classList.add("right-[0px]");
  document.getElementById("carrinho").classList.remove("right-[-360px]");
}

function fecharCarrinho() {
  document
    .getElementById("carrinho")
    .classList.remove("shadow-[0_35px_60px_-15px_rgba(255,255,255,0.5)]");
  document.getElementById("carrinho").classList.remove("right-[0px]");
  document.getElementById("carrinho").classList.add("right-[-360px]");
}

// Inicialização do carrinho com abertura e fechamento
export function inicializarCarrinho() {
  const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
  const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");

  botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
  botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
}

function incrementarQuantidadeProduto(idProduto) {
  idsProdutosCarrinhoComQuantidade[idProduto]++;
  atualizarInformacaoQuantidade(idProduto);
}

function decrementarQuantidadeProduto(idProduto) {
  if (idsProdutosCarrinhoComQuantidade[idProduto] === 1) {
    removerCarrinho(idProduto);
    return;
  }
  idsProdutosCarrinhoComQuantidade[idProduto]--;
  atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto) {
  document.getElementById(`quantidade-${idProduto}`).innerText =
    idsProdutosCarrinhoComQuantidade[idProduto];
}

function removerCarrinho(idProduto) {
  delete idsProdutosCarrinhoComQuantidade[idProduto];
  renderizarProdutosCarrinho();
}

function desenharProdutoNoCarrinho(idProduto) {
  const produto = catalogo.find((p) => p.id === idProduto);

  const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");

  const elementoArticle = document.createElement("article");
  const articleClasses = [
    "flex",
    "h-24",
    "bg-slate-100",
    "my-2",
    "rounded-lg",
    "relative",
  ];
  for (const classe of articleClasses) {
    elementoArticle.classList.add(classe);
  }

  const cartaoProdutoCarrinho = `

      <button id="remover-item-${produto.id}"><i
      class="absolute right-2 top-2 fa-regular fa-circle-xmark text-slate-500 hover:text-slate-900"></i></button>
      <img src="./assets/imgs/${produto.imagem}" alt="${
    produto.nome
  }" class="p-1">
      <div class=" p-1 flex flex-col justify-between">
        <p class="text-slate-800 text-sm">${produto.nome}</p>
        <p class="text-slate-400 text-xs">Tamanho: M</p>
        <p class="text-green-700 text-lg">$${produto.preco}</p>

      </div>

      <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
        <button id="decrementar-produto-${produto.id}">-</button>
        <p id="quantidade-${produto.id}" class="ml-2">${
    idsProdutosCarrinhoComQuantidade[produto.id]
  }</p>
        <button class="ml-2" id="incrementar-produto-${produto.id}">+</button>
      </div>`;

  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);

  document
    .getElementById(`incrementar-produto-${produto.id}`)
    .addEventListener("click", () => incrementarQuantidadeProduto(produto.id));
  document
    .getElementById(`decrementar-produto-${produto.id}`)
    .addEventListener("click", () => decrementarQuantidadeProduto(produto.id));
  document
    .getElementById(`remover-item-${produto.id}`)
    .addEventListener("click", () => removerCarrinho(produto.id));
}

function renderizarProdutosCarrinho() {
  const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");

  containerProdutosCarrinho.innerHTML = "";

  for (const idProduto in idsProdutosCarrinhoComQuantidade) {
    desenharProdutoNoCarrinho(idProduto);
  }
}

// Função para adicionar produto ao carrinho, incrementar e decrementrar número de produtos
export function adicionarAoCarrinho(idProduto) {
  if (idProduto in idsProdutosCarrinhoComQuantidade) {
    incrementarQuantidadeProduto(idProduto);
    return;
  }

  idsProdutosCarrinhoComQuantidade[idProduto] = 1;
  desenharProdutoNoCarrinho(idProduto);
}