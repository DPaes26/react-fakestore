import { useState } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import { useEffect } from "react";

const App = () => {
  // 1. Guarda todos os produtos que vêm da API
  const [produtos, setProdutos] = useState([]);
  // 2. Guarda qual é a categoria que o cliente quer ver (começa em "All" para mostrar tudo)
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("All");//guarda o filtro atual

  function buscarProdutos() {
    fetch("https://fakestoreapi.com/products") //Vai buscar a lista de 20 produtos à internet (à Fake Store API).
      .then((response) => { return response.json() }) //Quando a resposta chega, convertemos esses dados para formato JSON (dados legíveis em JavaScript).
      .then((response) => {
        setProdutos(response)//Pegamos nessa lista completa de produtos e guardamos dentro do nosso estado produtos.
      })
  }

  //Esta função é enviada para o Header através de uma prop. 
  // Quando o cliente clica numa 
  // categoria no menu, essa categoria chega aqui como argumento.
  function filtrarProdutos(categoria) {
    console.log(categoria);
    setCategoriaSelecionada(categoria); //Em vez de mexermos diretamente nos produtos (o que destruía a lista original), nós apenas guardamos na memória qual foi a categoria em que o utilizador clicou.

    // if (categoria != "All") {
    //     let produtosFiltrados = produtos.filter((produto) => {
    //         return produto.category == categoria;
    //     });
    //     setProdutos(produtosFiltrados);
    // } else {
    //     setProdutos(produtos);
    // }
  }

  useEffect(() => { //Diz ao React: "assim que a página carregar e for desenhada no ecrã pela primeira vez, executa o que está aqui dentro".
    buscarProdutos();//Chama a nossa função para ir buscar os dados à API assim que o site abre.
  }, [])//Garante que esta busca à API acontece apenas uma vez quando o componente é montado, evitando um loop infinito de pedidos.



  let produtosFiltrados = [];//Criamos uma gaveta temporária para guardar os produtos que vão ser mostrados.

  if (categoriaSelecionada === "All") {//Se o utilizador escolheu ver tudo ("All"), a nossa gaveta recebe todos os produtos originais (produtos).
    produtosFiltrados = produtos;
  } else {//Senão, usamos o método .filter() do JavaScript no array original produtos.  Ele percorre cada produto e guarda na gaveta apenas aqueles cuja produto.category é igual à categoriaSelecionada.
    produtosFiltrados = produtos.filter((produto) => {
      return produto.category == categoriaSelecionada;
    });
  }


  return ( //A Renderização

    <>
      <Header filtrarProdutos={filtrarProdutos} />
      <main className="p-15 bg-slate-200">
        <div className="grid grid-cols-4 gap-4">
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