import React from "react";
import {useAuth} from "./context/auth-context";
import {Route, Navigate} from "react-router-dom";

export function PrivateRoute({path, element}) {
  const {login} = useAuth();
  console.log("login is", login);

  return login ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate state={{from: path}} to="/login" replace={true} />
  );
}
