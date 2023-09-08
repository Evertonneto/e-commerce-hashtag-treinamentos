import { desenharProdutoSimples } from "./src/components/utilidades";
import { lerLocalStorage } from "./src/components/utilidades";
import { apagarDoLocalStorage } from "./src/components/utilidades";
import { salvarLocalStorage } from "./src/components/utilidades";

function desenharProdutosCheckout() {
  const idsProdutosCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
  for (const idProduto in idsProdutosCarrinhoComQuantidade) {
    desenharProdutoSimples(
      idProduto,
      "container-produtos-checkout",
      idsProdutosCarrinhoComQuantidade[idProduto]
    );
  }
}

function finalizarCompra(evento) {
  evento.preventDefault();
  const idsProdutosCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
  if (Object.keys(idsProdutosCarrinhoComQuantidade).length === 0) {
    return;
  }
  const dataAtual = new Date();
  const pedidoFeito = {
    dataPedido: dataAtual,
    pedido: idsProdutosCarrinhoComQuantidade,
  };
  const historicoDePedidos = lerLocalStorage("historico") ?? [];
  const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];
  salvarLocalStorage("historico", historicoDePedidosAtualizado);

  apagarDoLocalStorage("carrinho");
  window.location.href = "/pedidos.html";
}

desenharProdutosCheckout();

document.addEventListener("submit", (evt) => finalizarCompra(evt));
