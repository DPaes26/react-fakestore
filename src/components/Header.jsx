const  Header = ({filtrarProdutos}) => {
    return ( 
        <header className="flex items-center justify-between px-15 py-4 bg-orange-600">
        <div>
            <input type="text" placeholder="digite o nome do produto" className="w-120 h-10 rounded bg-white pl-4"/>
        </div>

        <div>
            <select onChange={(e) => filtrarProdutos(e.target.value)} className="h-10 rounded bg-white px-4">
                <option selected disabled>Filtrar categoria</option>
                <option>All</option>
                <option>men's clothing</option>
                <option>jewelery</option>
                <option>electronics</option>
                <option>women's clothing</option>
            </select>

            <select className="h-10 rounded bg-white">
                <option selected disabled>Ordenar produtos</option>
                <option value="preco">Ordenar por preço</option>
                <option value="nota">Ordenar por avaliação</option>
            </select>
        </div>
    </header>
     );
}
 
export default Header;