import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Calendar from "../components/DayPickerComponent"

const styles = theme => ({

});

const MONTHS = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月'
];

const WEEKDAYS_LONG = [
   '日曜日',
   '月曜日',
   '火曜日',
   '水曜日',
   '木曜日',
   '金曜日',
   '土曜日'
];

const WEEKDAYS_SHORT = ['日', '月', '火', '水', '木', '金', '土'];

class NaviComponent extends React.Component{
   
   constructor(props){
      super(props);
   }

   render(){
      return (
         <Grid container spacing={24}>
            <Grid item xs={12}>
               <Paper>認証</Paper>
            </Grid>
            <Grid item xs={12}>
               <Calendar />
            </Grid>
         </Grid>
       );
   }

}

export default withStyles(styles)(NaviComponent);