import React from "react";
import { Switch, Route} from "react-router-dom";
import { LoggedInProvider} from "./contexts/LoggedIn";
import { ThemeProvider } from "./contexts/ThemeContext";
import SignIn from "./SignIn";
import Index from "./CRUD/index";
import GroupIndex from "./Groups/GroupIndex";
import NewGroup from "./Groups/NewGroup";
import "./App.css";

function App() {
  return (
    <LoggedInProvider>
      <ThemeProvider>
        <Switch>
          <Route exact path="/" render={() => <SignIn />} />
          <Route exact path="/items" render={() => <Index />} />
          <Route exact path="/items/new" render={() => <NewGroup />} />
          <Route exact path="/groups" render={() => <GroupIndex />} />
          <Route exact path="/groups/new" render={() => <NewGroup />} />
        </Switch>
      </ThemeProvider>
    </LoggedInProvider>
  );
}

export default App;
