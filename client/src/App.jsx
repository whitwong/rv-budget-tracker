import React from 'react';
import NavigationBar from './components/BottomNavigation';
import './App.css';

// Export App to render to DOM
const App = () => { 
  return (
    <div className="App">
      <header className="App-header">  

      <NavigationBar />

      </header>
    </div>
  );
}

export default App;