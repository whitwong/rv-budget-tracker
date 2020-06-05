import React, { useState } from 'react';
import ExpenseCardList from '../components/ExpenseList';

// Container for Expense page view
const ExpensePage = () => {

  // React hook for Categories
  let [categoryList, setCategories] = useState(null);
  let [monthlyList, setMonth] = useState(null);

  // Send request to get categories from db and set categoryList with returned data. If error, throw error and log to console on client.
  const getCategories = () => {
    console.log("retrieving categories")
    fetch('/getCategories')
      .then(response => response.json())
      .then(data => { 
        categoryList = data.map(obj => obj.category);
        setCategories(categoryList);
        setMonth(null);
      })
      .catch(err => { console.log(err); throw(err) })
  }  

  // When monthly-btn selected, set monthly list.
  const getMonths = () => {
    console.log("retrieving months");
    setMonth(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
    setCategories(null);
  }

  return(
    <div className="ExpensePage">
      <p>Choose how you'd like to see Expense Data</p>

      {/* If categoryList or monthlyList are populated then display the chosen list */}
      {
        categoryList || monthlyList ? 
        <ExpenseCardList list={categoryList || monthlyList} />
        : 
        null
      }

      {/* Button to get categories of data */}
      <button 
          className="category-btn"
          onClick={() => getCategories()}
        >
          By Category
      </button>

      {/* Button to get data by month */}
      <button 
          className="monthly-btn"
          onClick={() => getMonths()}
        >
          By Month
      </button>
    </div>
  );
}

export default ExpensePage;