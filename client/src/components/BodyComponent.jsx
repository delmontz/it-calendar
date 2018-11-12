import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Navi from "./NaviComponent";
import EventViewer from "./EventViewerComponent";
import Notice from "./NoticeComponent";

/* TODO: marginが効いていないが？ないとスタイルが崩れる要調査 */
const styles = theme => ({
   div: {
      margin: '20px'
   },
   navi: {
      margin: '10px'
   }
});

class BodyComponent extends React.Component{
   
   constructor(props){
      super(props);
   }

   render(){
      const { classes } = this.props;

      return (
         <div>
            <Grid container spacing={24}>
               <Grid item xs={9}>
                  <div className={classes.div}>
                     <EventViewer />
                  </div>
               </Grid>
               <Grid item xs={3}>
                  <div className={classes.navi}>
                     <Navi />
                     <Notice />
                  </div>
               </Grid>
            </Grid>
         </div>
       );
   }

}

export default withStyles(styles)(BodyComponent);