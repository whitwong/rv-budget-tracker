import React, { useState } from 'react';
import ExpenseDetails from './ExpenseDetails';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(50),
      height: theme.spacing(16),
    },
  },
}));

// Get list data and display using Material-UI components
const ExpenseCardList = ({ list, search }) => {
  const classes = useStyles();

  // React hook for expense variables
  const [expenseDetails, setExpenseDetails] = useState(null);
  const [showExpenseDetails, setShowExpenseDetails] = useState(false)

  // Helper function to clean up returned data before passing to ExpenseDetails
  const cleanData = ( data ) => {
    let cleanData = data.map(d => {
      return {
        purchase_date: d.purchase_date.substring(0,10),
        purchase_details: d.purchase_details,
        location: d.location,
        cost: parseFloat(d.cost),
        purchaser: d.purchaser
      }
    })

    return cleanData
  }

  // Send request to get data associated with category/month
  const getExpenseDetails = ( listItem ) => {
    let url = "";
    search === 'category' ? url='/getExpenseCategory/' : url='/getExpenseMonthly/';

    fetch(url+listItem)
        .then(response => response.json())
        .then(data => cleanData(data))
        .then(data => {
          setShowExpenseDetails(true);
          setExpenseDetails(data);
        })
  }

  return(
    <div className={classes.root}>
    {/* Display list of expense items by month or category */}
    {
      list &&
      list.map((listItem, index) => (
        <Card 
          className="list-item"
          key={index}
          index={index}
          item={listItem}
        >
          {/* If listItem contains '_', then replace it with '/'. 
              Else if listItem contains and multiple uppercase characters, add space and trim space before/after string. 
              Else return listItem. */}
          {
            listItem.match('_') ? listItem.replace('_', '/') : listItem.match(/([A-Z])/g).length > 1 ? listItem.replace(/([A-Z])/g, ` $1`).trim() : listItem
          }
          <CardActions>
            <Button 
              item={listItem}
              onClick={() => getExpenseDetails(listItem, search)}
            >
              Details
            </Button>
          </CardActions>
        </Card>
      ))
    }

    {/* Display expense details */}
    {
      showExpenseDetails ? <ExpenseDetails data={expenseDetails}/> : null
    }
  </div>
  );
};

export default ExpenseCardList;