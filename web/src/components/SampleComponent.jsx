import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Pre from '../components/TestComponent';

const styles = theme => ({
   root: {
     flexGrow: 1
   },
   paper: {
     padding: theme.spacing.unit * 2,
     textAlign: "center",
     color: theme.palette.text.secondary
   }
});

class AppContainer extends React.Component{
   
   constructor(props){
      super(props);
   }

   render(){
      return (
         <div className={this.props.classes.root}>
           <Grid container spacing={24}>
             <Grid item xs={12}>
               <Paper className={this.props.classes.paper}>xs=12</Paper>
             </Grid>
             <Grid item xs={12} sm={6}>
               <Paper className={this.props.classes.paper}>xs=12 sm=6</Paper>
             </Grid>
             <Grid item xs={12} sm={6}>
               <Paper className={this.props.classes.paper}>xs=12 sm=6</Paper>
             </Grid>
           </Grid>
         </div>
       );
   }

}

export default withStyles(styles)(AppContainer);