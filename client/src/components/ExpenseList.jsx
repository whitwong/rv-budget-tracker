import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(50),
      height: theme.spacing(16),
    },
  },
}));

// Get list data and display using Material-UI components
const ExpenseCardList = ({ list }) => {
  const classes = useStyles();

  return(
    <div className={classes.root}>
    {
      list &&
      list.map((listItem, index) => (
        <Card 
          className="list-item"
          key={index}
          index={index}
        >
          {listItem}
        </Card>
      ))
    }
  </div>
  );
};

export default ExpenseCardList;