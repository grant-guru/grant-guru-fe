import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Form from '../Form/Form';
import Login from '../Login/Login';

function App() {
  return (
    <main className="App">
      <Switch>
        <Route exact path="/" render={Login} />
        <Route path="/form" render={Form}/>
        <Route path="*" render={Login} />
      </Switch>
    </main>
  );
}

export default App