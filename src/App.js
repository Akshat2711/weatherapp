

import React from 'react';
import './App.css';
import Main from './components/Main'; // Importing the Main component

function App() {
  return (
    <div className="App">
      <header>
        <h1>Weather.io</h1>
      </header>
      <main>
        <Main /> {/* This will now display weather data */}
      </main>
    </div>
  );
}

export default App;
