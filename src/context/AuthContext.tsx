import React, { createContext, useContext, useState, useCallback } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  loginAsAdmin: () => void;
  logout: () => void;
}

const CartContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, name?: string) => {
    setUser({
      id: "user-1",
      name: name || email.split("@")[0],
      email,
      phone: "+91 98765 43210",
      isAdmin: false,
    });
  }, []);

  const loginAsAdmin = useCallback(() => {
    setUser({
      id: "admin-1",
      name: "Admin",
      email: "admin@urbanrentals.com",
      phone: "+91 98765 00000",
      isAdmin: true,
    });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <CartContext.Provider value={{ user, isAuthenticated: !!user, login, loginAsAdmin, logout }}>
      {children}
    </CartContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
