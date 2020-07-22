import React, { useState } from 'react';
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
import CollapsibleTable from './CollapsibleTable';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: false
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  content: {
    margin: theme.spacing(1),
    padding: theme.spacing(2)
  },
}));

// Container for modal containing expense data details
const ExpenseModal = ({ data, isOpen, handleClose, search, searchItem }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false)
  const [dataSelection, setDataSelection] = useState(null)

  // Collapse/expand details section below chart
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  // Keep Table Data showing on collapsible dialog between bar/sector selections
  const handleSectorClick = () => {
    setExpanded(true)
  }

  // Set category/month data based on user selection from chart
  const handleChartDataClick = (selection) => {
    setDataSelection(selection)
  }

  // Change title according to Category or Monthly selection
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
      <Dialog maxWidth={false} onClose={handleClose} aria-labelledby="dialog-title" open={isOpen}>
        <DialogTitle id="dialog-title" onClose={handleClose}>
          {titleFormat()}
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.content} dividers>
        { search === 'category' 
            ? 
          <BarChart data={data} handleSectorClick={handleSectorClick} handleChartDataClick={handleChartDataClick} /> 
            : 
          <CustomPieChart data={data} handleSectorClick={handleSectorClick} handleChartDataClick={handleChartDataClick} /> 
        }
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleExpandClick} color="primary">
            { expanded ? "Hide Details" : "Show Details" }
          </Button>
        </DialogActions>
        { expanded ? <CollapsibleTable data={data} expanded={expanded} dataSelection={dataSelection} /> : null }
      </Dialog>
    </div>
  );
}

export default ExpenseModal;