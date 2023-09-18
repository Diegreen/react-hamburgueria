import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";

export const CartModal = ({
  cartList,
  setCartList,
  removeFromCart,
  closeModal,
  isModalOpen,
}) => {
  const total = cartList.reduce(
    (prevValue, product) => prevValue + product.price * product.quantity,
    0
  );

  const removeAllItems = () => {
    localStorage.removeItem("cartItems");
    setCartList([]);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartList));
  }, [cartList]);

  const totalQuantity = cartList.reduce(
    (totalQuantity, product) => totalQuantity + product.quantity,
    0
  );

  return (
    <div>
      {isModalOpen && <div className="modalBackdrop" />}
      <div role="dialog" className={`modal ${isModalOpen ? "open" : ""}`}>
        <div className="one">
          <h2>Carrinho de compras</h2>
          <button aria-label="close" title="Fechar" onClick={closeModal}>
            <MdClose size={21} />
          </button>
        </div>
        <div className="second">
          <ul>
            {cartList.map((product) => (
              <CartItemCard
                key={product.id}
                product={product}
                removeFromCart={removeFromCart}
              />
            ))}
          </ul>
        </div>
        <div className="three">
          <div>
            <span>{totalQuantity} itens</span>
            <span className="span-one">
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <button onClick={removeAllItems}>Remover todos</button>
        </div>
      </div>
    </div>
  );
};
