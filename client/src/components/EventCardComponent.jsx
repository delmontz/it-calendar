import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
   card: {
      display: 'flex',
      justifyContent: 'space-between',
      height: '800px'
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
                        <Avatar aria-label="Recipe">
                           😁
                        </Avatar>
                     }
                     title={<h1>{eventData.title}</h1>}
                  />
                  <Typography variant="h6">📅日時</Typography>
                  <Typography variant="body1" color="textSecondary">{this.getOpenTime(eventData.open_time)}</Typography>
                  <Typography variant="h6">🌏場所</Typography>
                  <Typography variant="body1" color="textSecondary">{eventData.place}</Typography>
                  <Typography variant="h6">🏡住所</Typography>
                  <Typography variant="body1" color="textSecondary">{eventData.address}</Typography>
                  <Typography variant="body1" color="textSecondary"><div dangerouslySetInnerHTML={{ __html: eventData.description }} /></Typography>
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

