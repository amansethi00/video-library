import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../index";
import "./Login.css";
const Login = () => {
  const [error, setError] = useState("");
  const {setLogin} = useAuth();
  let navigate = useNavigate();
  const {state} = useLocation();
  const loginHandler = async () => {
    try {
      const isValidUser = await axios.get(
        `https://videolib.amansethi00.repl.co/user`,
        {
          headers: {
            Authorization: `${inputEmail.current.value}:${inputPassword.current.value}`,
          },
        }
      );
      if (isValidUser.data.success) {
        console.log("success");
        setLogin(true);
        localStorage.setItem("username", isValidUser.data.user.username);
        localStorage.setItem("password", isValidUser.data.user.password);
        localStorage.setItem("isLogin", true);
        navigate(state?.from ? state.from : "/");
      } else {
        setError(isValidUser.data.message);
      }
    } catch (error) {
      setError(error);
    }
  };
  const inputEmail = useRef();
  const inputPassword = useRef();
  useEffect(() => {
    if (localStorage.getItem("isLogin")) {
      navigate("/");
    }
  }, []);
  console.log("login console out");
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
          <form
            onSubmit={(event) => {
              event.preventDefault();
              loginHandler();
            }}
          >
            <div class="modal-body mg-top-1">
              <div class="input-grp-md">
                <span class="input-grp-text" style={{width: "6.5rem"}}>
                  Username
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
            <div className="flex mg-top-half" style={{flexDirection: "column"}}>
              <button className="btn-login btn-primary" onClick={loginHandler}>
                Login
              </button>
              <p className="sm">
                Not a user yet?<Link to="/signup">Create Account</Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
