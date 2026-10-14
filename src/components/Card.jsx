const Card = ({title, image, rate, price, category}) => {
    return (
        <div className="bg-white rounded p-4">
            <div className="relative">
                <img src={image} alt=""
                    className="w-full h-55 object-contain" />
                <div className="p-2 bg-orange-500 text-white font-bold absolute top-3 right-3 rounded">{rate}</div>
            </div>

            {/* textos do card */}
            <div>
                <h2 className="font-semibold text-xl line-clamp-1">{title}</h2>
                <h6 className="font-bold">{category}</h6>
                <h6 className="text-right text-2xl"> R${price.toFixed(2)}</h6>
            </div>
        </div>
    );
}

export default Card;