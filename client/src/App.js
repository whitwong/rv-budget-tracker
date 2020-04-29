import React from 'react';
import logo from './logo.svg';
import './App.css';


const App = () => {

  const buttonPress = () => {
    console.log("button pressed")
    fetch('/ping')
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hi Whitney, Welcome to your RV Budget Tracker Dashboard
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button 
          className="click-me-button"
          onClick={buttonPress}
        >
          Click Me!
        </button>
      </header>
    </div>
  );
}

export default App;