import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
   card: {
     display: 'flex',
   },
   details: {
     display: 'flex',
     flexDirection: 'column',
     justifyContent: 'flex-end'
   },
   content: {
     flex: '1 0 auto'
   },
   cover: {
     width: 400,
     height: 151,
   }
 });

class EventCardComponent extends React.Component{
   
   constructor(props){
      super(props);
   }

   render(){
      const { classes, eventData } = this.props;
      return (
         <div>
            <Card className={classes.card}>
               <div className={classes.details}>
                  <CardContent className={classes.content}>
                     <Typography variant="headline">{eventData.title}</Typography>
                     <Typography variant="subheading" color="textSecondary">{eventData.description}</Typography>
                     <Typography variant="subheading" color="textSecondary">{eventData.open_time.toDateString()}</Typography>
                     <Typography variant="subheading" color="textSecondary">{eventData.place}</Typography>
                     <Typography variant="subheading" color="textSecondary">{eventData.address}</Typography>
                  </CardContent>
               </div>
            <CardMedia
               className={classes.cover}
               image={eventData.thumb}
               title="Live from space album cover"
            />
            </Card>
         </div>
      );
   }

}

export default withStyles(styles)(EventCardComponent);

