import React from 'react';
import logo from './logo.svg';
import { Counter } from '../../features/counter/Counter';
import './App.css';
import { Route } from 'react-router-dom';

function App() {
  return (
    <main className="App">
      <Route path='/' render={() => <h1>Grant Guru</h1>} />
    </main>
  );
}

export default App