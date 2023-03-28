import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Form from '../Form/Form';

function App() {
  return (
    <main className="App">
      <Route path='/' render={() => <h1>Grant Guru</h1>} />
      <Form/>
    </main>
  );
}

export default App