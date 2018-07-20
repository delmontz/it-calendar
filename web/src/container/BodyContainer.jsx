import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FilterFeat from "../components/FilteringFeatureComponent"
import EventViewer from "../components/EventViewerComponent"

const styles = theme => ({
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
            <Grid item xs={12}>
                <EventViewer />
            </Grid>
          </Grid>
         </div>
       );
   }

}

export default withStyles(styles)(BodyContainer);