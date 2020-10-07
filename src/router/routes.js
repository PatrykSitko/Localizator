import React from "react";
import Home from "./routes/home.js";
import Login from "./routes/login.js";

export default ({ allowedToRoute, ...props }) => {
  return (
    allowedToRoute &&
    (({ ...props }) => {
      switch (window.location.pathname) {
        case "/login":
          return <Login {...props} />;
        default:
          return <Home {...props} />;
      }
    })({ ...props })
  );
};
