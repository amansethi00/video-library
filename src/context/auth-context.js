import {createContext, useContext, useState, useEffect} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [login, setLogin] = useState(
    localStorage.getItem("token") ? true : false
  );
  console.log("local storegae token", localStorage.getItem("token"), login);
  const [token, setToken] = useState(localStorage.getItem("token") ?? "");
  useEffect(() => {}, []);

  return (
    <AuthContext.Provider value={{login, setLogin, token, setToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
