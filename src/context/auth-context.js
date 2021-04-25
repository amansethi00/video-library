import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
const AuthContext = createContext();
const usersDb = [{username: "aman", password: "aman"}];
export function AuthProvider({children}) {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    if (
      localStorage?.getItem("username") !== undefined &&
      localStorage.getItem("password") !== undefined &&
      localStorage.getItem("isLogin") === true
    ) {
      setLogin(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{login, setLogin}}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
