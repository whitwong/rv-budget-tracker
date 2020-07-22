import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  pageStyle: {
    width: '80%',
    flex: '1 0 auto'
  },
}))

// Container for Landing Page view
const LandingPage = () => {
  const classes = useStyles();

  return(
    <div className={classes.pageStyle}>

      <h1>Hello There! <span role="img" aria-label="wave-hand" >👋</span></h1>
      <h3>Welcome to the RV Budget Dashboard for Random Ventures</h3>  

      <p>Put Landing Page info here</p>
      <p>Maybe add a cool RV travel pic</p>
    </div>
  );
}

export default LandingPage;