import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
   card: {
      display: 'flex',
      justifyContent: 'space-between',
      height: '700px'
   },
   content: {
      justifyContent: 'space-between',
      flexDirection: 'row'
   }
});

class EventCardComponent extends React.Component {

   constructor(props) {
      super(props);
   }

   render() {
      const { classes, eventData } = this.props;
      return (
         <div>
            <Card className={classes.card}>
               <CardContent className={classes.content}>
                  <CardHeader
                     avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                           😁
                        </Avatar>
                     }
                     action={
                        <IconButton>
                           <MoreVertIcon />
                        </IconButton>
                     }
                     title={<h1>{eventData.title}</h1>}
                     subheader={this.getOpenTime(eventData.open_time)}
                  />
                  <Typography variant="subheading" color="textSecondary"><div dangerouslySetInnerHTML={{ __html: eventData.description }} /></Typography>
                  <Typography variant="body2">場所</Typography>
                  <Typography variant="subheading" color="textSecondary">{eventData.place}</Typography>
                  <Typography variant="body2">住所</Typography>
                  <Typography variant="subheading" color="textSecondary">{eventData.address}</Typography>
               </CardContent>
            </Card>
         </div>
      );
   }

   getOpenTime(opentime){
      let date = new Date(opentime);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let min = date.getMinutes();
      return ('開催予定: ' + year + '年' + month + '月' + day + '日 ' + hour + '時' + min + '分');
   }

}

export default withStyles(styles)(EventCardComponent);

