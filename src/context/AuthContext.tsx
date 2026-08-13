import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { fetchJson } from "../lib/apiClient";
import {
  clearAuthSession,
  readAuthSession,
  writeAuthSession,
} from "../lib/authStorage";
import type { AuthSession } from "../lib/authStorage";
import { decodeJwtPayload } from "../lib/jwt";
import type { TokenResponse } from "../types/auth";

interface AuthContextValue {
  session: AuthSession | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() =>
    readAuthSession()
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    function handleUnauthorized() {
      clearAuthSession();
      setSession(null);
      queryClient.clear();
    }

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, [queryClient]);

  async function login(username: string, password: string) {
    const data = await fetchJson<TokenResponse>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    const claims = decodeJwtPayload(data.access_token);
    const newSession: AuthSession = {
      token: data.access_token,
      role: claims.role,
      customerId: claims.customer_id,
      username,
      exp: claims.exp,
    };

    writeAuthSession(newSession);
    setSession(newSession);
    queryClient.clear();
  }

  function logout() {
    clearAuthSession();
    setSession(null);
    queryClient.clear();
  }

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
