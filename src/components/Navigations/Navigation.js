import React from "react";
import logout from "./log-out.svg";

export const Navigation = ({ onRouteChange, SignedIn }) => {
  if (SignedIn) {
    return (
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-end",
          fontFamily: "Sigmar One, cursive",
        }}
      >
        <p
          className="f3 link dim black underline pa3 pointer"
          onClick={() => onRouteChange("signout")}
        >
          Sign Out <img src={logout} alt="logout" />
        </p>
      </nav>
    );
  } else {
    return (
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-end",
          fontFamily: "Sigmar One, cursive",
        }}
      >
        <p
          className="f3 link dim black underline pa3 pointer"
          onClick={() => onRouteChange("register")}
        >
          Register
        </p>
        <p
          className="f3 link dim black underline pa3 pointer"
          onClick={() => onRouteChange("signin")}
        >
          Sign In 
        </p>
      </nav>
    );
  }
};
