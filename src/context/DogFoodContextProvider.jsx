import {
  useMemo, useState, createContext, useEffect
} from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const TOKEN_LS_KEY = "TOKEN_LS_KEY";

  const [token, setToken] = useState(() => {
    const dataFromLS = localStorage.getItem(TOKEN_LS_KEY);

    return dataFromLS || '';
  });

  useEffect(() => {
    localStorage.setItem(TOKEN_LS_KEY, token);
  }, [token]);

  const valueProvider = useMemo(() => ({
    token, setToken
  }), [token]);

  return (
    <AppContext.Provider value={valueProvider}>
      {children}
    </AppContext.Provider>
  );
}
