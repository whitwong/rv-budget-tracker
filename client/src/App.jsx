import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ExpensePage from './pages/ExpensePage';
import AboutUsPage from './pages/AboutUs';
import logo from './logo.svg';
import './App.css';

// Export App to render to DOM
const App = () => {

  const buttonPress = () => {
    console.log("button pressed")
    fetch('/ping')
  }

  return (
    <div className="App">
      <header className="App-header">      
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/ExpensePage">Expenses</Link>
          </li>
          <li>
            <Link to="/AboutUsPage">About Us</Link>
          </li>
        </ul>

        <hr />
        <Switch>
          <Route exact path='/'><LandingPage/></Route>
          <Route exact path='/ExpensePage'><ExpensePage/></Route>
          <Route exact path='/AboutUsPage'><AboutUsPage/></Route>
        </Switch>
      </Router>
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