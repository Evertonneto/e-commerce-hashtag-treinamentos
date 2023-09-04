import { adicionarAoCarrinho } from "./menuCarrinho";
import { catalogo } from "./utilidades";

export function renderizarCatalago() {
  for (const produtoCatalogo of catalogo) {
    const cartaoProduto = `
        <div id="card-produto-${produtoCatalogo.id}" class="flex flex-col justify-between border-solid pb-2  w-48 m-2 group shadow-xl shadow-slate-400 rounded-lg p-2">
          <img
            src="./src/assets/imgs/${produtoCatalogo.imagem}.jpg"
            alt="Produto ${produtoCatalogo.id} do Magazine Hashtag."
            style="height: 300px"
            class="group-hover:scale-110 duration-300 my-3 rounded-lg" 
          />
          <p class='text-sm'>${produtoCatalogo.marca}</p>
          <p class='text-sm'>${produtoCatalogo.nome}</p>
          <p class='sm'>${produtoCatalogo.preco}</p>
          <button id="adicionar-${produtoCatalogo.id}" class="bg-slate-950 text-slate-200 hover:bg-slate-700 "><i class="fa-solid fa-cart-plus"></i></button>
        </div>`;

    document.getElementById("container-product").innerHTML += cartaoProduto;
  }
  for (const produtoCatalogo of catalogo) {
    document
      .getElementById(`adicionar-${produtoCatalogo.id}`)
      .addEventListener("click", () => adicionarAoCarrinho(produtoCatalogo.id));

    console.log(produtoCatalogo.id);
  }
}
