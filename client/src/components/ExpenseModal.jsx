import React from 'react';
import CustomPieChart from './CustomPieChart';
import BarChart from './BarChart';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

// Container for modal containing expense data details
const ExpenseModal = ({ data, isOpen, handleClose, search, searchItem }) => {
  const classes = useStyles();

  const titleFormat = () => {
    if(search === 'category'){
      const cleanName = searchItem.match('_') ? searchItem.replace('_', '/') : searchItem.match(/([A-Z])/g).length > 1 ? searchItem.replace(/([A-Z])/g, ` $1`).trim() : searchItem
      return `Expense Data for ${cleanName} Costs`
    }
    else {
      return `Expense Data for Month of ${searchItem}`
    }
  }

  return (
    <div>
      <Dialog fullScreen onClose={handleClose} aria-labelledby="dialog-title" open={isOpen}>
        <DialogTitle id="dialog-title" onClose={handleClose}>
          {titleFormat()}
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.root} dividers>
        { search === 'category' ? <BarChart data={data} /> : <CustomPieChart data={data} /> }
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Show Details
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ExpenseModal;