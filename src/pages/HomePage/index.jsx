import { useState, useEffect } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";

export const HomePage = () => {
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToCart = (product) => {
    const existingProduct = cartList.find((item) => item.id === product.id);

    if (existingProduct) {
      const updatedCart = cartList.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartList(updatedCart);
    } else {
      const updatedCart = [...cartList, { ...product, quantity: 1 }];
      setCartList(updatedCart);
    }
  };

  const cartItemCount = cartList.reduce((total, product) => total + product.quantity, 0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://hamburgueria-kenzie-json-serve.herokuapp.com/products"
        );
        const data = await response.json();
        setProductList(data);

        localStorage.setItem("products", JSON.stringify(data));
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProductList(JSON.parse(storedProducts));
    } else {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartList(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    const filtered = productList.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [productList, searchTerm]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartList));
  }, [cartList]);

  const removeFromCart = (productId) => {
    const updatedCart = cartList.filter((product) => product.id !== productId);
    setCartList(updatedCart);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  const openModal = () => {
    console.log("Opening modal");
    setIsModalOpen(true);
  };

  return (
    <body className="body">
      <Header openModal={openModal} setSearchTerm={setSearchTerm} cartItemCount={cartItemCount} />
      <main className="main">
        <ProductList
          productList={productList}
          addToCart={addToCart}
          filteredProducts={filteredProducts}
        />
        <CartModal
          closeModal={closeModal}
          cartList={cartList}
          setCartList={setCartList}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          removeFromCart={removeFromCart}
        />
      </main>
    </body>
  );
};
