import { useHistory } from "react-router-dom";
import React, { createContext, useState } from "react";

export const LoggedInContext = createContext();

export function LoggedInProvider(props) {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);

  const changeLogIn = (val) => {
    setLoggedIn(val);
    if(val) NavigateAway('/items');
  };

  const NavigateAway = path => {
   history.push(path);
  }

  return (
    <LoggedInContext.Provider value={{ loggedIn, changeLogIn }}>
      {props.children}
    </LoggedInContext.Provider>
  );
}
