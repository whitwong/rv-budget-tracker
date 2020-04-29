import React from 'react';
import NavigationBar from './components/BottomNavigation';
import './App.css';

// Export App to render to DOM
const App = () => { 
  return (
    <div className="App">
      <header className="App-header">  

        <h1>Hi Whitney <span role="img">👋</span></h1>
        <p>Welcome to your RV Budget Tracker Dashboard</p>    

        <NavigationBar />

      </header>
    </div>
  );
}

export default App;