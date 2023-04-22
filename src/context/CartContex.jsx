import { listItemSecondaryActionClasses } from "@mui/material";
import { createContext, useState } from "react";

export const CartConstext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (currentItem) => {
    if (items.some(({ item }) => item.id === currentItem.item.id)) return;
    setItems([...items, currentItem]);
  };

  const removeItem = (itemId) => {
    const itemsDelete = items.filter((elemt) => elemt.item.id !== itemId);
    setItems(itemsDelete);
  };
  const clear = () => {
    setItems([]);
  };
  const isInCart = (id) => {
    if (items.some(({ item }) => item.id === id)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <CartConstext.Provider
      value={{ items, addItem, removeItem, isInCart, clear }}
    >
      {children}
    </CartConstext.Provider>
  );
};
