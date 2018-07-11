import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
});

class EventCardComponent extends React.Component{
   
   constructor(props){
      super(props);
   }

   componentWillMount(){
     
   }

   render(){
      return (
         <Grid container spacing={24}>
            <Grid item>
               <Button variant="outlined" size="medium">地域</Button>
            </Grid>
         </Grid>
       );
   }

}

export default withStyles(styles)(EventCardComponent);