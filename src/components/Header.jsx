const  Header = ({filtrarProdutos, ordenarProdutos, pesquisarProdutos}) => {
    return ( 
        <header className="flex items-center justify-between px-10 py-4 bg-orange-600">
        <div>
            <input onChange={(e) => pesquisarProdutos(e.target.value)} type="text" placeholder="digite o nome do produto" className="w-full lg:w-120 h-10 rounded bg-white pl-4"/>
        </div>

        <div className="flex gap-4 *:w-full lg:*:w-auto">
            <select onChange={(e) => filtrarProdutos(e.target.value)} className="h-10 rounded bg-white px-4">
                <option selected disabled>Filtrar categoria</option>
                <option>All</option>
                <option>men's clothing</option>
                <option>jewelery</option>
                <option>electronics</option>
                <option>women's clothing</option>
            </select>

            <select onChange={(e) => ordenarProdutos(e.target.value)} className="h-10 mx-5   rounded bg-white">
                <option selected disabled>Ordenar produtos</option>
                <option value="preco">Ordenar por preço</option>
                <option value="nota">Ordenar por avaliação</option>
            </select>
        </div>
    </header>
     );
}
 
export default Header;