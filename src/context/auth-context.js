import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import {useNavigate, useLocation} from "react-router-dom";
const AuthContext = createContext();
const usersDb = [{username: "aman", password: "aman"}];
export function AuthProvider({children}) {
  let navigate = useNavigate();
  const isUserCredentialsExist = async ({username, password}) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          const user = usersDb.find((prev) => prev.username === username);
          if (user?.password === password) {
            console.log("use passsword matched");
            localStorage.setItem("isLogin", "true");
            resolve({user: true});
          } else {
            resolve({
              user: false,
              error: "Please enter correct username and password",
            });
          }
        }, 300);
      } catch (error) {
        console.log(error);
      }
    });
    // const user = usersDb.find((prev) => prev.username === username);
    // if (user?.password === password) {
    //   console.log("use passsword matched");
    //   return true;
    // }
    // console.log(user);
    // console.log("use passsword not matched");
    // return false;
  };
  const reducer = (state, {type}) => {
    switch (type) {
      case "LOGIN":
        return {...state, login: true};
      default:
        return {...state};
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    login: localStorage.getItem("isLogin") === "true" ? true : false,
  });
  console.log("login ...", state.login);
  useEffect(() => {
    localStorage?.getItem("isLogin") === "true" && dispatch({type: "LOGIN"});
  }, []);

  return (
    <AuthContext.Provider value={{state, dispatch, isUserCredentialsExist}}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
