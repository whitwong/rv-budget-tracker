import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import AssessmentIcon from '@material-ui/icons/Assessment';
import InfoIcon from '@material-ui/icons/Info';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import ExpensePage from '../pages/ExpensePage';
import AboutUsPage from '../pages/AboutUs';

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function NavigationBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <Router>

      {/* Switch required to route to Pages. Pages displayed above bottom navigation. */}
      <Switch>
        <Route exact path='/'><LandingPage/></Route>
        <Route exact path='/ExpensePage'><ExpensePage/></Route>
        <Route exact path='/AboutUsPage'><AboutUsPage/></Route>
      </Switch>

      {/* Added react-router component Link and paths to Material UI bottom navigation component. */}
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels 
        className={classes.root}
      >
        <BottomNavigationAction component={ Link } to="/" label="Home" icon={<HomeIcon />}></BottomNavigationAction>
        <BottomNavigationAction component={ Link } to="/ExpensePage" label="Expenses" icon={<AssessmentIcon />}></BottomNavigationAction>
        <BottomNavigationAction component={ Link } to="/AboutUsPage" label="About Us" icon={<InfoIcon />} />
      </BottomNavigation>

    </Router>   
  );
}