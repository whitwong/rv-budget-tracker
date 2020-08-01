import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PieChart from '../components/LandingPagePieChart';
import helper from '../helpers';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  pageStyle: {
    width: '80%',
    flex: '1 0 auto',
  },
  cardStyle: {
    background: '#3d4148',
    color: 'white',
    variant: 'outlined',
    padding: theme.spacing(2)
  },
  textOverall: {
    color: "#BE375F"
  },
  textInitialCost: {
    color: "#ED8554"
  },
  textTravelCost: {
    color: "#429fa3"
  },
}))

// Container for Landing Page view
export default function LandingPage() {
  const classes = useStyles();

  const [overallTotalCost, setOverallTotalCost] = useState(null);               // Overall total cost value
  const [initialCost, setInitialCost] = useState(null);                         // Initial cost value of Rig
  const [travelCost, setTravelCost] = useState(null);                           // Travel cost (overall cost - initial cost)
  const [allTotalsArr, setAllTotalsArr] = useState([]);                         // Array of objects containing totals for all categories [{category: 'string1', total: num1}, {category: 'string2', total: num2}, ...]
  const [travelTotalsArr, setTravelTotalsArr] = useState([])                    // Array of objects containing totals for all categories except InitialCosts
  const [modifiedAllTotalsArr, setModifiedAllTotalsArr] = useState([]);         // Array of objects containing 2 objects: 1) InitialCosts 2) TravelCosts
  const [modifiedTravelTotalsArr, setModifiedTravelTotalsArr] = useState([]);   // Array of objects containing travel costs broken down by main expense items and consolidating small amounts into 'Other' category

  // Get Overall Expense Total and set value
  useEffect(() => {
    fetch('/getOverallExpenseTotal')
      .then(response => response.json())
      .then(data => setOverallTotalCost(data[0].total))
      .catch(err => { console.log(err); throw(err) })
  }, []);

  // Get Initial Cost and set value
  useEffect(() => {
    fetch('/getInitialCost')
      .then(response => response.json())
      .then(data => setInitialCost(data[0].total))
      .catch(err => { console.log(err); throw(err) })
  }, []);

  // Calculate Travel Cost by removing initialCost
  // Re-render if overallTotal and initialCost change (i.e. state is updated)
  useEffect(() => {
    if(overallTotalCost !== null && initialCost !== null ) setTravelCost(Number(overallTotalCost)-Number(initialCost));
  }, [overallTotalCost, initialCost]);

  // Get Category Totals and pass data to PieChart component
  useEffect(() => {
    fetch('/getCategoryTotals')
      .then(response => response.json())
      .then(data => {
        const list = data.filter(obj => obj.category !== 'InitialCosts');
        setTravelTotalsArr(list);
        setAllTotalsArr(data);
      })
      .catch(err => { console.log(err); throw(err) })
  }, [])

  // Landing page pie charts are very busy. Modify data to show consolidated costs.
  useEffect(() => {
    // For Total Overall Expenses, only show Initial Costs and Travel Costs.
    // Re-render if allTotalsList and travelCost change.
    const modifyTotalList = allTotalsArr.filter(obj => obj.category === 'InitialCosts');            // Filter object containing InitalCosts and store in new array.
    setModifiedAllTotalsArr([...modifyTotalList, {category: "TravelCosts", total: travelCost}]);    // Set state with filtered array and new Travel Totals object.
  }, [allTotalsArr, travelCost]);

  useEffect(() => {
    // For Travel Costs, show main expenses. This includes: Gas, Food, Rig Upgrades, Maintenance/Repair. Consolidate everything else to "Other".
    // Re-render if travelTotalsArr changes
    const modifyTravelList = travelTotalsArr.filter(obj => ('Gas Food RigUpgrades Maintenance_Repair').includes(obj.category) === true);
    const otherCatTotal = travelTotalsArr.filter(obj => ('Gas Food RigUpgrades Maintenance_Repair').includes(obj.category) === false).map(obj => obj.total).reduce((a,c) => a + c, 0);
    setModifiedTravelTotalsArr([...modifyTravelList, {category: 'Other', total: otherCatTotal}]);
  }, [travelTotalsArr])

  return(
    <div className={classes.pageStyle}>

      <h1>Hello There! <span role="img" aria-label="wave-hand" >👋</span></h1>
      <h3>Welcome to the RV Budget Dashboard for Random Ventures</h3>  

      <Grid container spacing={2}>

        <Grid container item>
          <Grid item xs={12}>
            <Card className={classes.cardStyle}>
              <CardContent>
                <Typography variant="h4">
                  Total Overall Expenses 
                </Typography>
                <Typography variant="h3" className={classes.textOverall}>
                  {helper.formatCurrency(overallTotalCost)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container item spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card className={classes.cardStyle}>
              <CardContent>
                <Typography variant="h5">
                    Initial Cost of RV
                  </Typography>
                  <Typography variant="h4" className={classes.textInitialCost}>
                    {helper.formatCurrency(initialCost)}
                  </Typography>
                  <Typography>
                    Cost of Rig before traveling
                  </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className={classes.cardStyle}>
              <CardContent>
                <Typography variant="h5">
                    Total Travel Costs
                  </Typography>
                  <Typography variant="h4" className={classes.textTravelCost}>
                    {helper.formatCurrency(travelCost)}
                  </Typography>
                  <Typography>
                    Total expenses while traveling minus initial rig cost
                  </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container item spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card className={classes.cardStyle}>
              <Typography variant="h5">Total Overall Expenses Chart</Typography>
              <PieChart totalsList={modifiedAllTotalsArr} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className={classes.cardStyle}>
              <Typography variant="h5">Total Travel Costs Chart</Typography>
              <PieChart totalsList={modifiedTravelTotalsArr} />
            </Card>
          </Grid>
        </Grid>

      </Grid>
    </div>
  );
}