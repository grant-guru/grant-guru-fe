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
        <Route exact path="/" component={Login} />
        <Route path="/form" component={Form}/>
        <Route path="/scholarships" component={Library}/>
        <Route path="/saved" component={Saved}/>
        <Route path="*" component={Login} />
      </Switch>
    </main>
  );
}

export default App