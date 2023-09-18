import { ProductCard } from "./ProductCard";

export const ProductList = ({ productList, addToCart, filteredProducts }) => {
  const productsToDisplay =
    filteredProducts.length > 0 ? filteredProducts : productList;

  return (
    <ul className="productSection">
      {productsToDisplay.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </ul>
  );
};
