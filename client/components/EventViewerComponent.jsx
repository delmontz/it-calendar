import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {inject, observer} from 'mobx-react';

import EventCard from './EventCardComponent';

const styles = theme => ({
});

@inject('eventStore')
@observer
class EventViewerComponent extends React.Component{
   
   constructor(props){
      super(props);
      this.props.eventStore.res_init_comp_flg = true;
   }

   render(){
      return (
         <Grid container spacing={24}>
            {this.createEventView()}
         </Grid>
      );
   }

   createEventView(){
      const {eventStore} = this.props;
      let dom;
      if(eventStore.res_init_comp_flg){
         let eventbox = [];
         eventStore.acquired_event_data.forEach(event_data => {
            eventbox.push((
               <Grid item xs={12}>
                  <EventCard eventData={event_data} />
               </Grid>
            ));
         });
         dom = eventbox;
      }else{
         dom = (<h1>🌐読み込み中🌐</h1>);
      }
      return dom;
   }

}

export default withStyles(styles)(EventViewerComponent);