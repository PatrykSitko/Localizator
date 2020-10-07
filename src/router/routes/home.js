import React from "react";

function HomeRoute({ ...props }) {
  return (
    <div>
      <button
        onClick={() => window.history.pushState("Login", "Login", "/login")}
      >
        Login
      </button>
      home
    </div>
  );
}

export default HomeRoute;
