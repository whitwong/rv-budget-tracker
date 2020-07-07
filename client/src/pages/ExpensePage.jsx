import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ExpenseCardList from '../components/ExpenseList';

// Container for Expense page view
const ExpensePage = () => {

  // React hook for Categories
  let [categoryList, setCategories] = useState(null);
  const [monthlyList, setMonth] = useState(null);
  const [search, setSearch] = useState(null);
  const [showList, setShowList] = useState({
    showCategory: false,
    showMonthly: false
  })

  // Send request to get categories from db and set categoryList with returned data. If error, throw error and log to console on client.
  const getCategories = () => {
    if (categoryList === null) {
      fetch('/getCategories')
      .then(response => response.json())
      .then(data => { 
        console.log("retrieving categories from db")

        categoryList = data.map(obj => obj.category);
        setCategories(categoryList);
        setSearch("category");
        setShowList({
          showCategory: true,
          showMonthly: false
        })
      })
      .catch(err => { console.log(err); throw(err) })
    }
    else {
      console.log("retrieving categories from state")

      setSearch("category");
      setShowList({
        showCategory: true,
        showMonthly: false
      })
    }
  }  

  // When monthly-btn selected, set monthly list.
  const getMonths = () => {
    console.log("retrieving months");
    setMonth(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
    setSearch("month")
    setShowList({
      showCategory: false,
      showMonthly: true
    })
  }

  return(
    <div className="ExpensePage">
      <h2>Choose how you'd like to see Expense Data</h2>

      {/* If categoryList or monthlyList are populated then display the chosen list */}
      {
        showList.showCategory ? <ExpenseCardList list={categoryList} search={search} /> 
        : showList.showMonthly ? <ExpenseCardList list={monthlyList} search={search} />
        : null
      }

      {/* Button to get categories of data */}
      <Button 
          color="primary"
          variant="contained"
          className="category-btn"
          size="large"
          onClick={() => getCategories()}
        >
          By Category
      </Button>

      {/* Button to get data by month */}
      <Button 
          color="secondary"
          variant="contained"
          className="monthly-btn"
          size="large"
          onClick={() => getMonths()}
        >
          By Month
      </Button>
    </div>
  );
}

export default ExpensePage;