import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../index";
import "./Login.css";
const Login = () => {
  const [error, setError] = useState("");
  const {login, setLogin, setToken} = useAuth();
  let navigate = useNavigate();
  if (login) {
    navigate("/");
  }
  const {state} = useLocation();
  const loginHandler = async () => {
    try {
      const isValidUser = await axios.get(
        `https://videolib.amansethi00.repl.co/login`,
        {
          headers: {
            Authorization: `${inputEmail.current.value}:${inputPassword.current.value}`,
          },
        }
      );
      if (isValidUser.data.success) {
        console.log("success");
        setLogin(true);
        setToken(isValidUser.data.token);
        localStorage.setItem("token", isValidUser.data.token);
        navigate(state?.from ? state.from : "/");
      } else {
        setError(isValidUser.data.message);
      }
    } catch (error) {
      console.log(error);
      setError("sorry can'e find the user,try again");
    }
  };
  const inputEmail = useRef();
  const inputPassword = useRef();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  console.log("login console out");
  return (
    <div className="login">
      <div className="modal">
        <div className="modal-container mg-top-1">
          <div className="modal-head bold xlg">Login</div>
          {error !== "" && (
            <div className="alert-red sm align-items-center">
              <div className="alert-text">{error}</div>
              <button className="alert-image sm" onClick={() => setError("")}>
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
            <div className="modal-body mg-top-1">
              <div className="input-grp-md">
                <span className="input-grp-text" style={{width: "6.5rem"}}>
                  Username
                </span>
                <input
                  ref={inputEmail}
                  className="input"
                  placeholder="enter your email here"
                />
              </div>
              <div className="input-grp-md">
                <span className="input-grp-text">Password</span>
                <input
                  ref={inputPassword}
                  type="password"
                  className="input"
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
