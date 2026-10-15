import { useState } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import { useEffect } from "react";

const App = () => {
  // 1. Guarda todos os produtos que vêm da API
  const [produtos, setProdutos] = useState([]);
  // 2. Guarda qual é a categoria que o cliente quer ver (começa em "All" para mostrar tudo)
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);//guarda o filtro atual

  function buscarProdutos() {
    fetch("https://fakestoreapi.com/products") //Vai buscar a lista de 20 produtos à internet (à Fake Store API).
      .then((response) => { return response.json() }) //Quando a resposta chega, convertemos esses dados para formato JSON (dados legíveis em JavaScript).
      .then((response) => {
        setProdutos(response)//Pegamos nessa lista completa de produtos e guardamos dentro do nosso estado produtos.
        setProdutosFiltrados(response);
      })
  }

  //Esta função é enviada para o Header através de uma prop. 
  // Quando o cliente clica numa 
  // categoria no menu, essa categoria chega aqui como argumento.
  function filtrarProdutos(categoria) {
    console.log(categoria);
    if (categoria != "All") {
      let produtosFiltrados = produtos.filter((produto) => {
        return produto.category == categoria.toLowerCase();
      });
      setProdutosFiltrados(produtosFiltrados);
    } else {
      setProdutosFiltrados(produtos);
    }
  }

  function ordenarProdutos(ordem) {
    console.log(ordem);
    let produtosOrdenados = [];
    if (ordem == "preco") {
      produtosOrdenados = produtos.toSorted((prodA, prodB) => {
        return prodA.price - prodB.price;
      });
    } else {
      produtosOrdenados = produtos.toSorted((prodA, prodB) => {
        return prodB.rating.rate - prodA.rating.rate;
      });
    };
    setProdutosFiltrados(produtosOrdenados);
  }

  function pesquisarProdutos(texto) {

    if (texto.length == 0) {
      setProdutosFiltrados(produtos);
      return;
    }
    if (texto.length >= 3) {
      let produtosEncontrados = produtos.filter((produto) => {
        return produto.title.toLowerCase().includes(texto.toLowerCase());
      });
      setProdutosFiltrados(produtosEncontrados);
    }
  }

  useEffect(() => { //Diz ao React: "assim que a página carregar e for desenhada no ecrã pela primeira vez, executa o que está aqui dentro".
    buscarProdutos();//Chama a nossa função para ir buscar os dados à API assim que o site abre.
  }, [])//Garante que esta busca à API acontece apenas uma vez quando o componente é montado, evitando um loop infinito de pedidos.






  return ( //A Renderização

    <>
      <Header
        filtrarProdutos={filtrarProdutos}
        ordenarProdutos={ordenarProdutos}
        pesquisarProdutos={pesquisarProdutos}
      />
      <main className="p-4 lg:p-15 bg-slate-200 ">
        <div className="grid lg:grid-cols-4 gap-4">
          {
            produtosFiltrados.map((produto) => (
              <Card
                key={produto.id}
                title={produto.title}
                image={produto.image}
                category={produto.category}
                price={produto.price}
                rate={produto.rating.rate}
              />
            ))
          }
        </div>
      </main>
    </>
  );
}

export default App;

// No seu código original, quando você fazia setProdutos(produtosFiltrados), você estava a substituir a lista completa por uma lista menor. A segunda vez que tentava filtrar, já só tinha os poucos itens daquela categoria, e o resto tinha desaparecido.