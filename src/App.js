import React from "react";
import { Switch, Route} from "react-router-dom";
import { LoggedInProvider} from "./contexts/LoggedIn";
import { ThemeProvider } from "./contexts/ThemeContext";
import SignIn from "./SignIn";
import Index from "./CRUD/index";
import GroupIndex from "./Groups/GroupIndex";
import "./App.css";

function App() {
  return (
    <LoggedInProvider>
      <ThemeProvider>
        <Switch>
          <Route exact path="/" render={() => <SignIn />} />
          <Route exact path="/items" render={() => <Index />} />
          <Route exact path="/items/new" render={() => <h1>New Item</h1>} />
          <Route exact path="/groups" render={() => <GroupIndex />} />
        </Switch>
      </ThemeProvider>
    </LoggedInProvider>
  );
}

export default App;
