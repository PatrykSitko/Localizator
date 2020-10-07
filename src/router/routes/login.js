import React, { useState, useRef } from "react";
import "./login.scss";

function HomeRoute({ ipv4, loginValue, passwordValue, setState, ...props }) {
  const login = useRef();
  const password = useRef();
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  if (typeof loginValue !== "string") {
    setState({ loginValue: "Login" });
  }
  if (typeof passwordValue !== "string") {
    setState({ passwordValue: "" });
  }
  const loginForm = (
    <div className="login-form" key="loginform">
      <form
        id="login"
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          if (loginValue === "Login") {
            login.current.focus();
            return;
          }
          const credentials = {
            ipv4,
            login: login.current && login.current.value,
            password: password.current && password.current.value,
          };
          fetch("/account/authenticate", {
            method: "POST",
            headers: {
              "Application-Type": "application/json",
              body: JSON.stringify(credentials),
            },
          })
            .then((res) => res.json())
            .then(({ status, AUTHENTICATION_TOKEN, error }) => {
              console.log(status, AUTHENTICATION_TOKEN, error);
              switch (status) {
                default:
                  break;
                case "UNKNOWN_USER":
                  break;
                case "WRONG_PASSWORD":
                  break;
                case "ACCESS_GRANTED":
                  break;
              }
            })
            .catch(console.error);
        }}
      >
        <input
          type="text"
          id="text"
          name="text"
          required
          ref={login}
          value={loginValue}
          onChange={(e) => {
            setState({ loginValue: e.target.value });
          }}
          onFocus={() => {
            if (loginValue === "Login") {
              setState({ loginValue: "" });
            }
          }}
          onBlur={() => {
            if (loginValue === "") {
              setState({ loginValue: "Login" });
            }
          }}
        ></input>
        <input
          type="password"
          id="password"
          name="password"
          required
          ref={password}
          value={passwordValue}
          onChange={(e) => {
            setState({ passwordValue: e.target.value });
          }}
        ></input>
        <button id="login-button" type="submit" form="login" value="Login">
          Login
        </button>
        <a href="/">Have you forgotten your account name?</a>
        <div className="separator">‌‌ </div>
        <button
          type="button"
          id="register-button"
          onClick={() => setShowRegisterForm(!showRegisterForm)}
        >
          Register
        </button>
      </form>
    </div>
  );
  const registerForm = (
    <div className="register-form" key="registerform">
      <form>
        <input type="text" id="firstname" name="firstname" />
      </form>
    </div>
  );
  return showRegisterForm ? [registerForm, loginForm] : loginForm;
}

export default HomeRoute;
