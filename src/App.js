import React from "react";
import { Switch, Route} from "react-router-dom";
import { LoggedInProvider} from "./contexts/LoggedIn";
import { ThemeProvider } from "./contexts/ThemeContext";
import SignIn from "./SignIn";
import Index from "./CRUD/index";
import "./App.css";

function App() {
  return (
    <LoggedInProvider>
      <ThemeProvider>
        <Switch>
          <Route exact path="/" render={() => <SignIn />} />
          <Route exact path="/items" render={() => <Index />} />
        </Switch>
      </ThemeProvider>
    </LoggedInProvider>
  );
}

export default App;
