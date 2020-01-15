import React, { createContext, useState } from "react";

export const LoggedInContext = createContext();

export function LoggedInProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const changeLogIn = (val) => {
    setLoggedIn(val);
  };
  return (
    <LoggedInContext.Provider value={{ loggedIn, changeLogIn }}>
      {props.children}
    </LoggedInContext.Provider>
  );
}
