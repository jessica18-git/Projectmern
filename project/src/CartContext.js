import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [packageCount, setPackageCount] = useState(1);

  const incrementCount = () => setPackageCount(prevCount => prevCount + 1);
  const decrementCount = () => setPackageCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));

  return (
    <CartContext.Provider value={{ packageCount, incrementCount, decrementCount }}>
      {children}
    </CartContext.Provider>
  );
}
