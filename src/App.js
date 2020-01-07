import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import SignIn from './SignIn';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Switch>
        <Route exact path="/" render={() => <SignIn />} />
      </Switch>
    </ThemeProvider>
  )
}

export default App;
