import React, { useState, useContext } from "react";
export const CartContext = React.createContext([]);

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  //global state to store order
  const [cart, setCart] = useState([]);

  //function to add products
  const addProduct = (item, newQuantity) => {
    const newCart = cart.filter((prod) => prod.id !== item.id);
    newCart.push({ ...item, quantity: newQuantity });
    setCart(newCart);
  };

  //function to clear all the cart
  const clearCart = () => setCart([]);

  //function to remove just one product
  const removeProduct = (id) =>
    setCart(cart.filter((product) => product.id !== id));

  //Exportation of the context
  return (
    <CartContext.Provider
      value={{
        clearCart,
        removeProduct,
        addProduct,
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
