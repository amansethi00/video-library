import React, {useState, useRef, useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../context/auth-context";
import axios from "axios";

export const Signup = () => {
  const [error, setError] = useState("");
  const {setLogin} = useAuth();
  let navigate = useNavigate();
  const {state} = useLocation();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const signupHandler = async () => {
    try {
      const isValidUser = await axios.post(
        `https://videolib.amansethi00.repl.co/user`,
        {
          username: inputEmail.current.value,
          password: inputPassword.current.value,
        },
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
      console.log({isValidUser});
    } catch (error) {
      setError(error);
      console.log({error});
    }
  };
  useEffect(() => {
    if (localStorage.getItem("isLogin")) {
      navigate("/");
      // navigate(state?.from ? state.from : "/");
    }
  }, []);
  return (
    <div className="login">
      <div class="modal">
        <div class="modal-container mg-top-1">
          <div className="modal-head bold xlg">Create a New Account</div>
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
                Username
              </span>
              <input
                ref={inputEmail}
                class="input"
                placeholder="enter username here"
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
            <button className="btn-login btn-primary" onClick={signupHandler}>
              Signup
            </button>
            <p className="sm">
              Already a member?<Link to="/login">Login</Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
