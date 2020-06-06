import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ExpenseCardList from '../components/ExpenseList';

// Container for Expense page view
const ExpensePage = () => {

  // React hook for Categories
  let [categoryList, setCategories] = useState(null);
  const [monthlyList, setMonth] = useState(null);
  const [search, setSearch] = useState(null);

  // Send request to get categories from db and set categoryList with returned data. If error, throw error and log to console on client.
  const getCategories = () => {
    console.log("retrieving categories")
    fetch('/getCategories')
      .then(response => response.json())
      .then(data => { 
        categoryList = data.map(obj => obj.category);
        setCategories(categoryList);
        setSearch("category");
        setMonth(null);
      })
      .catch(err => { console.log(err); throw(err) })
  }  

  // When monthly-btn selected, set monthly list.
  const getMonths = () => {
    console.log("retrieving months");
    setMonth(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
    setSearch("month")
    setCategories(null);
  }

  return(
    <div className="ExpensePage">
      <p>Choose how you'd like to see Expense Data</p>

      {/* If categoryList or monthlyList are populated then display the chosen list */}
      {
        categoryList || monthlyList ? 
        <ExpenseCardList list={categoryList || monthlyList} search={search} />
        : 
        null
      }

      {/* Button to get categories of data */}
      <Button 
          color="primary"
          variant="contained"
          className="category-btn"
          onClick={() => getCategories()}
        >
          By Category
      </Button>

      {/* Button to get data by month */}
      <Button 
          color="primary"
          variant="contained"
          className="monthly-btn"
          onClick={() => getMonths()}
        >
          By Month
      </Button>
    </div>
  );
}

export default ExpensePage;