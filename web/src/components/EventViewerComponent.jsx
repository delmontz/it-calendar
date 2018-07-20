import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import web from "superagent";
import EventCard from "./EventCardComponent"
import {inject, observer} from 'mobx-react';

const styles = theme => ({
});

@inject('eventStore')
@observer
class EventViewerComponent extends React.Component{
   
   constructor(props){
      super(props);

      //最初はとりあえず現日付のイベントを取得表示
      const current_time = new Date();
      web.get('http://localhost:3000/api')
      .query({period: '' + current_time.getFullYear() + ('00' + (current_time.getMonth() + 1)).slice(-2) + ('00' + current_time.getDate()).slice(-2)})
      .then(function(res){
         props.eventStore.acquired_event_data = res.body;
      });
   }

   render(){
      const dumy = {
         provider: 'conpass',
         event_id: 12345,
         title: 'hogehogeのイベント',
         description: '内容はないよ',
         open_time: new Date(),
         place: '皇居の真ん中',
         address: '千代田区１－１－１',
         thumb: 'https://connpass.com/static/img/api/connpass_logo_1.png'      
      };
      return (
         <Grid container spacing={24}>
            <Grid item　xs={12}>
              <h1>{this.props.eventStore.view_current_str}</h1>
            </Grid>
            <Grid item　xs={12}>
               <EventCard eventData={dumy}/>
            </Grid>
         </Grid>
       );
   }

}

export default withStyles(styles)(EventViewerComponent);