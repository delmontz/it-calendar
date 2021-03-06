import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';

import Calendar from "./DayPickerComponent"

const styles = theme => ({
   navi: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
   },
   calendar: {
      padding: '20px'
   }
});

class NaviComponent extends React.Component{
   
   constructor(props){
      super(props);
   }

   render(){
      const { classes } = this.props;

      return (
         <Grid container spacing={24}>
            <Grid item xs={12} className={classes.navi}>
               <Card className={classes.calendar}>
                  <Calendar />
               </Card>
            </Grid>
         </Grid>
      );
   }

}

export default withStyles(styles)(NaviComponent);