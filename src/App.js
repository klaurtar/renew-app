import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import SignIn from './SignIn';
import Index from './CRUD/index';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Switch>
        <Route exact path="/" render={() => <SignIn />} />
        <Route exact path="/items" render={() => <Index />} />
      </Switch>
    </ThemeProvider>
  )
}

export default App;
