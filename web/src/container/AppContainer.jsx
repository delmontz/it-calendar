import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Body from "./BodyContainer"
import Info from "./InfoContainer"
import Sidebar from "./SidebarContainer"
import {Provider} from 'mobx-react';
import EventStore from '../logic/EventStore'


const styles = theme => ({
   root: {
     flexGrow: 1
   }
});

const eventStore = new EventStore();

class AppContainer extends React.Component{
   
   constructor(props){
      super(props);
      
   }

   render(){
      return (
         <Provider  eventStore={eventStore}>
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
         </Provider>
       );
   }
}

export default withStyles(styles)(AppContainer);