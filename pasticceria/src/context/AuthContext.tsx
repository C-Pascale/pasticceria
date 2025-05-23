import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { login as loginService } from "../services/api"; // Importa la funzione login dal servizio

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>; // accetta credenziali
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem("auth") === "true"
  );

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const success = await loginService(username, password); // chiama API
      if (success) {
        setIsAuthenticated(true);
        localStorage.setItem("auth", "true");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login fallito:", error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
