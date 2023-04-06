import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Form from '../Form/Form';
import Login from '../Login/Login';
import Library from '../Library/Library';
import ScholarshipDetail from '../ScholarshipDetail/ScholarshipDetail'

function App() {

  return (
    <main className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/form" component={Form}/>
        <Route exact path="/scholarships" render={() => <Library card='scholarships'/>}/>
        <Route exact path="/saved" render={() => <Library card='saved'/>}/>
        <Route path="/scholarship/:id" render={({ match }) => <ScholarshipDetail id={match.params.id} />} />
        <Route path="*" component={Login} />
      </Switch>
    </main>
  );
}

export default App