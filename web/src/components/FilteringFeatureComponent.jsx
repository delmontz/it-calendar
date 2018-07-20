import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
});

class FilteringFeatureComponent extends React.Component{
   
   constructor(props){
      super(props);
      var dom = (<h1>hoge</h1>);
   }

   render(){
      return (
         <Grid container spacing={24}>
            <Grid item>
               <Button variant="outlined" size="medium">地域</Button>
            </Grid>
            <Grid item>
               <Button variant="outlined" size="medium">イベント種別</Button>
            </Grid>
            <Grid item>
               <Button variant="outlined" size="medium">タグ</Button>
            </Grid>
            <Grid item>
               <Button variant="outlined" size="medium">期間</Button>
            </Grid>
         </Grid>
       );
   }

}

export default withStyles(styles)(FilteringFeatureComponent);