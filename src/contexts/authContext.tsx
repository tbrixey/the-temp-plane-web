import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { User } from "../types/user";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const STORAGE_KEY = "ttp_session";

export interface Session {
  user: {
    data: User;
    accessToken: string;
  };
}

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  signIn: (apiKey: string, callbackUrl?: string) => Promise<void>;
  signOut: () => void;
  navigate: (path: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
  signIn: async () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children, navigate }: { children: React.ReactNode; navigate: (path: string) => void }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: Session = JSON.parse(stored);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + parsed.user.accessToken;
        setSession(parsed);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (apiKey: string, callbackUrl?: string) => {
    const res = await axios.post(
      BASE_URL + "authorizePlayer",
      { apiKey },
      {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
      }
    );
    const user: User = res.data.data;
    const newSession: Session = {
      user: {
        data: user,
        accessToken: apiKey,
      },
    };
    axios.defaults.headers.common["Authorization"] = "Bearer " + apiKey;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
    setSession(newSession);
    if (callbackUrl) {
      navigate(callbackUrl);
    }
  };

  const signOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    delete axios.defaults.headers.common["Authorization"];
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, signIn, signOut, navigate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSession = () => {
  const { session } = useContext(AuthContext);
  return { data: session };
};

export const useAuth = () => useContext(AuthContext);
