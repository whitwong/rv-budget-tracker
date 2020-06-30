import React, { useState } from 'react';
import ExpenseChart from './ExpenseChart';
// import ExpenseModal from './ExpenseModal';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
// Dialog import
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


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

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

// Get list data and display using Material-UI components
const ExpenseCardList = ({ list, search }) => {
  const classes = useStyles();

  // React hook for expense variables
  const [expenseData, setExpenseData] = useState(null);
  const [showExpenseModal, setShowExpenseModal] = useState(false)

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
  const getExpenseData = ( listItem ) => {
    let url = "";
    search === 'category' ? url='/getExpenseCategory/' : url='/getExpenseMonthly/';

    fetch(url+listItem)
        .then(response => response.json())
        .then(data => cleanData(data))
        .then(data => {
          setShowExpenseModal(true);
          setExpenseData(data);
        })
        .catch(err => console.log("Woops...Trouble retrieving data " + err))
  }

  // Modal Functions
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
              onClick={() => {
                getExpenseData(listItem, search);
                handleClickOpen()
              }}
            >
              Details
            </Button>
          </CardActions>
        </Card>
      ))
    }

    {/* Display expense details */}
    {/* Make into a dialog box?????? */}
    {
      // showExpenseDetails ? <ExpenseDetails data={expenseDetails}/> : null
      // showExpenseModal ? <ExpenseModal data={expenseData} open={showExpenseModal} /> : null
      // <ExpenseModal data={expenseData} open={showExpenseModal} />
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          <ExpenseChart data={expenseData} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    }
  </div>
  );
};

export default ExpenseCardList;