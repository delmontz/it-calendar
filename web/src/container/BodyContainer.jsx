import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FilterFeat from "../components/FilteringFeatureComponent"

const styles = theme => ({
   root: {
      flexGrow: 1,
      backgroundColor: '#FFE2D1'
   },
   paper: {
     padding: theme.spacing.unit * 2,
     textAlign: "center",
     color: theme.palette.text.secondary
   }
});

class BodyContainer extends React.Component{
   
   constructor(props){
      super(props);
   }

   render(){
      return (
         <div className={this.props.classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
                <FilterFeat />
            </Grid>
          </Grid>
         </div>
       );
   }

}

export default withStyles(styles)(BodyContainer);