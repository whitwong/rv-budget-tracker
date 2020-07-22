import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  pageStyle: {
    width: '80%',
    flex: '1 0 auto'
  },
}))

// Container for About Us page view
const AboutUsPage = () => {
  const classes = useStyles();

  return(
    <div className={classes.pageStyle}>
      <h3>About the Project</h3>
      <p>This is a personal project. I wanted to keep up with my coding skills by creating
        a mini dashboard showing all the expenses we spent while traveling. Originally, it was
        meant to serve as a way for 1) Dusty and I to keep up with how much we owed each other
        and to 2) quickly see how much we spent while actively traveling on the road.
      </p>
      <h3>About Us</h3>
      <p>My husband (Dusty) and I (Whitney) made 2019 into a travel year. We bought
        a 24ft Class C Motorhome and traveled the continental United States and bordering regions 
        in Canada. We, of course, brought our dog Sophie with us. She was not a fan of the 
        RV, but she did enjoy exploring all the destinations we stayed at. We hit 32 states 
        (mostly in the west/midwest region) and visited Toronto/Niagra Falls, Calgary/Banff
        National Park, and Vancouver/Richmond areas in Canada. 
      </p>
    </div>
  );
}

export default AboutUsPage;