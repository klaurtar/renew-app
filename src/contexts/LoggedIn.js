import { useHistory } from "react-router-dom";
import React, { createContext, useState } from "react";

export const LoggedInContext = createContext();

export function LoggedInProvider(props) {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const changeLogIn = (val) => {
    setLoggedIn(val);
    if(val) NavigateAway('/items');
    if(!val) NavigateAway('/');
  };

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setToken(data);
  }

  const NavigateAway = path => {
   history.push(path);
  }

  return (
    <LoggedInContext.Provider value={{ loggedIn, changeLogIn, token, setToken: setTokens }}>
      {props.children}
    </LoggedInContext.Provider>
  );
}
