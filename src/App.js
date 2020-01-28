import React from "react";
import { Switch, Route } from "react-router-dom";
import { LoggedInProvider } from "./contexts/LoggedIn";
import { ThemeProvider } from "./contexts/ThemeContext";
import SignIn from "./SignIn";
import Index from "./CRUD/index";
import NewItem from "./CRUD/NewItem";
import EditItem from "./CRUD/EditItem";
import GroupIndex from "./Groups/GroupIndex";
import NewGroup from "./Groups/NewGroup";
import PrivateRoute from "./PrivateRoute";
import "./App.css";

function App() {
  return (
    <LoggedInProvider>
      <ThemeProvider>
        <Switch>
          <Route exact path="/" render={() => <SignIn />} />
          <PrivateRoute exact path="/items">
            <Route render={() => <Index />} />
          </PrivateRoute>
          <PrivateRoute exact path="/items/new">
            <Route render={() => <NewItem />} />
          </PrivateRoute>
          <PrivateRoute exact path="/items/edit/:id">
            <Route render={props => <EditItem {...props} />} />
          </PrivateRoute>
          <PrivateRoute exact path="/groups">
            <Route render={() => <GroupIndex />} />
          </PrivateRoute>
          <PrivateRoute exact path="/groups/new">
            <Route render={() => <NewGroup />} />
          </PrivateRoute>
        </Switch>
      </ThemeProvider>
    </LoggedInProvider>
  );
}

export default App;
