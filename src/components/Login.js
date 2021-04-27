import React, {useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../context/auth-context";
import "./Login.css";
export function Login() {
  const [error, setError] = useState("");
  const {
    state: {login},
    dispatch,
    isUserCredentialsExist,
  } = useAuth();
  let navigate = useNavigate();
  const {state} = useLocation();
  console.log(navigate.from);
  const loginHandler = async () => {
    const isValidUser = await isUserCredentialsExist({
      username: inputEmail.current.value,
      password: inputPassword.current.value,
    });
    console.log(isValidUser);
    console.log(isValidUser.user);

    if (isValidUser.user) {
      dispatch({type: "LOGIN"});

      navigate(state?.from ? state.from : "/");
    } else {
      setError(isValidUser.error);
    }
  };
  const inputEmail = useRef();
  const inputPassword = useRef();
  return (
    <div className="login">
      <div class="modal">
        <div class="modal-container mg-top-1">
          <div className="modal-head bold xlg">Login</div>
          {error !== "" && (
            <div class="alert-red sm align-items-center">
              <div class="alert-text">{error}</div>
              <button class="alert-image sm" onClick={() => setError("")}>
                X
              </button>
            </div>
          )}

          <div class="modal-body mg-top-1">
            <div class="input-grp-md">
              <span class="input-grp-text" style={{width: "6.5rem"}}>
                Email
              </span>
              <input
                ref={inputEmail}
                class="input"
                placeholder="enter your email here"
              />
            </div>
            <div class="input-grp-md">
              <span class="input-grp-text">Password</span>
              <input
                ref={inputPassword}
                type="password"
                class="input"
                placeholder="password"
              />
            </div>
          </div>
          <div class="row flex mg-top-half">
            <button className="btn-login btn-primary" onClick={loginHandler}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
