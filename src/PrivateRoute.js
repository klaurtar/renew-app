import React, { useContext } from "react";
import { Redirect, Route} from "react-router-dom";
import { LoggedInContext } from "./contexts/LoggedIn";

function PrivateRoute({ children, ...rest }) {
  const { loggedIn } = useContext(LoggedInContext);
  return (
    <Route
      {...rest}
      render={({ location }) => (loggedIn ? children : <Redirect to="/" />)}
    />
  );
}

export default PrivateRoute;
