import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Form from '../Form/Form';
import Login from '../Login/Login';

function App() {
  return (
    <main className="App">
      <Switch>
        <Route path="/" render={Login} />
        <Route path="/Form" render={Form}/>
        <Route path="*" render={Login} />
      </Switch>
    </main>
  );
}

export default App