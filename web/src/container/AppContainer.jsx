import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Body from "./BodyContainer"
import Info from "./InfoContainer"
import Sidebar from "./SidebarContainer"
import web from "superagent"


const styles = theme => ({
   root: {
     flexGrow: 1
   }
});

class AppContainer extends React.Component{
   
   constructor(props){
      super(props);
      
   }

   componentWillMount(){
    web.get('https://connpass.com/api/v1/event/')
      .withCredentials()
      .query({ym: '201802'})
      .end(function(err, res){
        console.log(res.body);
      });
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