import React from 'react';

// Container for Expense page view
const ExpensePage = () => {

  // Simple function to send request to /ping route and return response
  const buttonPress = () => {
    console.log("button pressed")
    fetch('/ping')
  }  

  return(
    <div className="ExpensePage">
      <p>Put expense data here</p>
      <p>Probably put <code>ExpenseList.jsx</code> here</p>

      {/* Random button to quick test that backend is still sending back responses */}
      <button 
          className="click-me-button"
          onClick={buttonPress}
        >
          Click Me!
      </button>

    </div>
  );
}

export default ExpensePage;