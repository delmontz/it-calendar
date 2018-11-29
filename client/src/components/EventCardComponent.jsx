import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import LinkIcon from '@material-ui/icons/Link';

const styles = theme => ({
   card: {
      display: 'flex',
      justifyContent: 'space-between',
      height: '800px'
   },
   content: {
      justifyContent: 'space-between',
      flexDirection: 'row'
   },
   button: {
      margin: '10px',
      height: '50px'
   }
});

class EventCardComponent extends React.Component {

   constructor(props) {
      super(props);
   }

   render() {
      const { classes, eventData } = this.props;
      return (
         <React.Fragment>
            <Card className={classes.card} raised={true}>
               <CardContent className={classes.content}>
                  <CardHeader
                     avatar={
                        <Button 
                           variant="contained"
                           className={classes.button}
                           onClick={() => {
                              window.open(eventData.url, 'newtab');
                           }}
                        >
                           <LinkIcon />
                           詳細はこちら
                        </Button>
                     }
                     title={<h1>{eventData.title}</h1>}
                  />
                  <Typography variant="title">📅日時</Typography>
                  <Typography variant="body2" gutterBottom={true}>{this.getOpenTime(eventData.open_time)}</Typography>
                  <Typography variant="title">🌏場所</Typography>
                  <Typography variant="body2" gutterBottom={true}>{eventData.place}</Typography>
                  <Typography variant="title">🏡住所</Typography>
                  <Typography variant="body2" gutterBottom={true}>{eventData.address}</Typography>
                  <Typography variant="body2"><div dangerouslySetInnerHTML={{ __html: eventData.description }} /></Typography>
               </CardContent>
            </Card>
         </React.Fragment>
      );
   }

   getOpenTime(opentime) {
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

