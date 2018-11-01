import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {inject, observer} from 'mobx-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

import EventCard from './EventCardComponent';

const styles = theme => ({
   button: {
      margin: theme.spacing.unit
    },
   rightIcon: {
      marginLeft: theme.spacing.unit,
    },
    div: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
});

@inject('eventStore')
@observer
class EventViewerComponent extends React.Component{
   
   constructor(props){
      super(props);
      /* 最初は当日のイベントを表示する */
      props.eventStore.setSelectingDate(new Date());
   }

   render(){
      const { classes } = this.props;

      return (
         <Grid container spacing={24}>
            {this.createEventView()}
            <Grid
               container
               direction="row"
               justify="flex-end"
               alignItems="center"
            >
               <Button 
                  variant="contained" 
                  color="default" 
                  className={classes.button} 
                  onClick={() => {
                     window.scrollTo(0,0);
               }}>
                  ページTOP
                  <ArrowUpward className={classes.rightIcon} />
               </Button>
            </Grid>
         </Grid>
      );
   }

   createEventView(){
      const {eventStore} = this.props;
      let dom;
      if(!eventStore.event_view_loading){
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
         dom = (<CircularProgress size={100} />);
      }
      return dom;
   }

}

export default withStyles(styles)(EventViewerComponent);