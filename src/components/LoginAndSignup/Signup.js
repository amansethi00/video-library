import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../index";
import axios from "axios";
import "./Login.css";
const Signup = () => {
  const [error, setError] = useState("");
  const { setLogin, setToken } = useAuth();
  let navigate = useNavigate();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const signupHandler = async () => {
    console.log(inputEmail.current.value);
    console.log(inputPassword.current.value);
    try {
      const isValidUser = await axios.post(
        `https://videolib.amansethi00.repl.co/signup`,
        {
          username: `${inputEmail.current.value}`,
          password: `${inputPassword.current.value}`,
        }
      );
      console.log({ isValidUser });

      if (isValidUser.data.success) {
        console.log("success");
        setLogin(true);
        setToken(isValidUser.data.token);
        // localStorage.setItem("username", inputEmail.current.value);
        // localStorage.setItem("password", isValidUser.data.user.password);
        localStorage.setItem("username", inputEmail.current.value);
        localStorage.setItem("token", isValidUser.data.token);
        localStorage.setItem("isLogin", true);
        // console.log("state from", state.from);
        navigate("/");
      } else {
        setError(isValidUser.data.message);
      }
    } catch (error) {
      console.log({ error });
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
      // navigate(state?.from ? state.from : "/");
    }
  }, []);
  return (
    <div className="login">
      <div className="modal" style={{ height: "19rem" }}>
        <div className="modal-container mg-top-1">
          <div className="modal-head bold xlg">Create a New Account</div>
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
              signupHandler();
            }}
          >
            <div className="modal-body mg-top-1">
              <div className="input-grp-md">
                <span className="input-grp-text" style={{ width: "6.5rem" }}>
                  Username
                </span>
                <input
                  ref={inputEmail}
                  className="input"
                  placeholder="enter username here"
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
            <div className=" mg-top-half">
              <button className="btn-login btn-primary" type="submit">
                Signup
              </button>
              <p className="sm">
                Already a member?<Link to="/login">Login</Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
