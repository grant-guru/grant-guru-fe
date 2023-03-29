import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Form from '../Form/Form';
import Login from '../Login/Login';
import Library from '../Library/Library';
import Saved from '../Saved/Saved';

function App() {
  return (
    <main className="App">
      <Switch>
        <Route exact path="/" render={Login} />
        <Route path="/form" render={Form}/>
        <Route path="/scholarships" render={Library}/>
        <Route path="/saved" render={Saved}/>
        <Route path="*" render={Login} />
      </Switch>
    </main>
  );
}

export default App