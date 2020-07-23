import React, { useState } from 'react';
import ExpenseCardList from '../components/ExpenseList';
import graphImg from '../assets/line-chart-seo-and-web-svgrepo-com.svg'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  pageStyle: {
    width: '80%',
    flex: '1 0 auto',
  },
  categoryButton: {
    background: '#BE375F',
    color: '#fff',
    '&:hover': {
      background: '#c44b6f'
    },
  },
  monthButton: {
    marginLeft: theme.spacing(2),
    background: '#ED8554',
    color: '#fff',
    '&:hover': {
      background: '#ee9165'
    },
  },
  imgStyle: {
    display: 'flex',
    margin: '0 auto',
    width: '50%',
  }
}))

// Container for Expense page view
const ExpensePage = () => {
  const classes = useStyles();

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
    <div className={classes.pageStyle}>
      {
        showList.showCategory || showList.showMonthly ? <h2>Select a Card to View Details</h2> : <h2>Choose how you'd like to see Expense Data</h2>
      }

      {/* Button to get categories of data */}
      <Button 
          className={classes.categoryButton}
          variant="contained"
          size="large"
          onClick={() => getCategories()}
        >
          By Category
      </Button>

      {/* Button to get data by month */}
      <Button 
          className={classes.monthButton}
          variant="contained"
          size="large"
          onClick={() => getMonths()}
        >
          By Month
      </Button>

      {/* If categoryList or monthlyList are populated then display the chosen list */}
      {
        showList.showCategory ? <ExpenseCardList list={categoryList} search={search} /> 
        : showList.showMonthly ? <ExpenseCardList list={monthlyList} search={search} />
        : <img src={graphImg} className={classes.imgStyle} alt='graphImg' />
      }

    </div>
  );
}

export default ExpensePage;