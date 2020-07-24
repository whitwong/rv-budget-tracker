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

  const [overallTotal, setOverallTotal] = useState(null);
  const [initialCost, setInitialCost] = useState(null);
  const [travelCost, setTravelCost] = useState(null);
  const [allTotalsList, setAllTotalsList] = useState([]);
  const [travelTotalsList, setTravelTotalsList] = useState([])

  // Get Overall Expense Total and set value
  useEffect(() => {
    fetch('/getOverallExpenseTotal')
      .then(response => response.json())
      .then(data => setOverallTotal(data[0].total))
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
  useEffect(() => {
    setTravelCost(overallTotal-initialCost)
  }, [overallTotal, initialCost])

  // Get Category Totals and pass data to PieChart component
  useEffect(() => {
    fetch('/getCategoryTotals')
      .then(response => response.json())
      .then(data => {
        setAllTotalsList(data)
      })
      .catch(err => { console.log(err); throw(err) })
  }, [])

  // Get Category Totals without InitialCosts and pass data to PieChart component
  useEffect(() => {
    fetch('/getCategoryTotals')
      .then(response => response.json())
      .then(data => {
        let list = []
        data.map(obj => {
          if(obj.category !== 'InitialCosts') {
            list.push(obj);
          }
        })
        setTravelTotalsList(list);
      })
      .catch(err => { console.log(err); throw(err) })
  }, [])


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
                  {helper.formatCurrency(overallTotal)}
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
                  <Typography color="white">
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
                  <Typography color="white">
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
              <PieChart totalsList={allTotalsList} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className={classes.cardStyle}>
              <Typography variant="h5">Total Travel Costs Chart</Typography>
              <PieChart totalsList={travelTotalsList} />
            </Card>
          </Grid>
        </Grid>

      </Grid>
    </div>
  );
}