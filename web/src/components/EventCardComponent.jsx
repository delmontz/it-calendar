import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
//import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
   card: {
     display: 'flex',
     justifyContent: 'space-between'
   },
   details: {
     display: 'flex',
     flexGrow: 1
   },
   content: {
    flex: '1 0 auto',
    justifyContent: 'space-between',
    flexDirection: 'row'
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
                      <CardHeader
                        avatar={
                          // <Avatar aria-label="Recipe" className={classes.avatar}>
                          // 😁
                          // </Avatar>
                        }
                        action={
                          <IconButton>
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={eventData.title}
                        subheader={eventData.open_time}
                      />
                     <Typography variant="subheading" color="textSecondary">{eventData.description}</Typography>
                     <Typography variant="body2">場所</Typography>
                     <Typography variant="subheading" color="textSecondary">{eventData.place}</Typography>
                     <Typography variant="body2">住所</Typography>
                     <Typography variant="subheading" color="textSecondary">{eventData.address}</Typography>
                  </CardContent>
               </div>
            <CardMedia
               className={classes.cover}
               image={eventData.thumb}
               title='イベントサムネイル'
            />
            </Card>
         </div>
      );
   }

}

export default withStyles(styles)(EventCardComponent);

