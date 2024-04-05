import { PropsWithChildren, useEffect, useState } from "react";
import { StorageHelper } from "../../utils/storage";
import { createContext, useContext } from "react";

export type AuthContextType = {
  token: string | null;
  setToken: (token: string) => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const useAuthContext = () => useContext(AuthContext);
export function AuthProvider(props: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  useEffect(() => {
    const persistedAuth = localStorage.getItem("token");

    if (persistedAuth !== token) {
      StorageHelper.set("token", token);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  );
}
