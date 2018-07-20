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
      this.state = {
        res_comp_flg: false
      }

      //最初はとりあえず現日付のイベントを取得表示
      const current_time = new Date();
      let self = this;
      web.get('http://localhost:3000/api')
      .query({period: '' + current_time.getFullYear() + ('00' + (current_time.getMonth() + 1)).slice(-2) + ('00' + current_time.getDate()).slice(-2)})
      .then(function(res){
        props.eventStore.acquired_event_data = res.body;
        self.setState({res_comp_flg: true});
      });

   }

   render(){
      return (
         <Grid container spacing={24}>
            <Grid item　xs={12}>
              <h1>{this.props.eventStore.view_current_str}</h1>
            </Grid>
            <Grid item　xs={12}>
              {(() => {
                  if(this.state.res_comp_flg == true){
                    let events = this.props.eventStore.acquired_event_data.events;
                    let event_card_list = [];
                    for(let i = 0; i < events.length; i++){
                      event_card_list.push(
                        <EventCard eventData={events[i]}/>
                      );
                    }
                    return (event_card_list);
                  }else{
                    return (<h1>ロード中</h1>);
                  }
                })()}
            </Grid>
         </Grid>
       );
   }

}

export default withStyles(styles)(EventViewerComponent);