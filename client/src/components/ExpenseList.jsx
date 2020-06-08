import React from 'react';
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

  // Send request to get data associated with category/month
  const getExpenseDetails = ( listItem ) => {
    if(search === 'category') {
      fetch('/getExpenseCategory/'+listItem)
        .then(response => response.json())
        .then(data => console.log(data)) //Do something with this data!!!
    }
    else if(search === "month") {
      fetch('/getExpenseMonthly/'+listItem)
        .then(response => response.json())
        .then(data => console.log(data)) //Do something with this data!!!
    }
  }

  return(
    <div className={classes.root}>
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
  </div>
  );
};

export default ExpenseCardList;