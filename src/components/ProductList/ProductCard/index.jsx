export const ProductCard = ({ product, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <li className="productCard">
      <img src={product.img} alt={product.name} />
      <div>
        <h3>{product.name}</h3>
        <span className="one">{product.category}</span>
        <span className="second">
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <button onClick={handleAddToCart}>Adicionar</button>
      </div>
    </li>
  );
};
