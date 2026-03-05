import React, { createContext, useContext, useState, useCallback } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  tenure: number; // months
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, tenure: number) => void;
  removeItem: (productId: string) => void;
  updateTenure: (productId: string, tenure: number) => void;
  clearCart: () => void;
  totalMonthly: number;
  totalDeposit: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product, tenure: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev;
      return [...prev, { product, tenure, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateTenure = useCallback((productId: string, tenure: number) => {
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, tenure } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalMonthly = items.reduce((sum, item) => {
    const opt = item.product.tenureOptions.find((t) => t.months === item.tenure);
    const discount = opt?.discount || 0;
    return sum + item.product.monthlyPrice * (1 - discount / 100);
  }, 0);

  const totalDeposit = items.reduce((sum, item) => sum + item.product.deposit, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateTenure,
        clearCart,
        totalMonthly,
        totalDeposit,
        itemCount: items.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
