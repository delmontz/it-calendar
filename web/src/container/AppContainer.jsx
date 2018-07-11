import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Body from "./BodyContainer"
import Info from "./InfoContainer"
import Sidebar from "./SidebarContainer"

const styles = theme => ({
   root: {
     flexGrow: 1
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
               <Info />
             </Grid>
          </Grid>
          <Grid container spacing={24}>
             <Grid item xs={9}>
               <Body />
             </Grid>
             <Grid item xs={3}>
               <Sidebar />
             </Grid>
          </Grid>
         </div>
       );
   }
}

export default withStyles(styles)(AppContainer);