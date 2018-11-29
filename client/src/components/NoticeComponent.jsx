import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

const styles = theme => ({
   card: {
      margin: '30px'
   }
});

class NoticeComponent extends React.Component{
   
   constructor(props){
      super(props);
   }

   render(){
      const { classes } = this.props;

      return (
         <React.Fragment>
            <Card className={classes.card}>
               <Typography variant="title">お知らせ</Typography>
               <Typography variant="body1">・掲載のイベント情報は、３：００時頃に更新されます。</Typography>
               <Typography variant="body1">・現在はconnpassのみに対応しています。</Typography>
               <img src="https://connpass.com/static/img/api/connpass_logo_3.png" />
               <Typography variant="body1">今後対応予定</Typography>
               <img src="https://dzpp79ucibp5a.cloudfront.net/assets/doorkeeper_logo_narrow-999e857ad622f8be283c53315a2ab118a4bcbac9230e6f102c6edfa02ee92cf1.svg" />
            </Card>
            <Card className={classes.card}>
               <Typography variant="title">お問い合わせ</Typography>
               <img src="https://dgl.tokyo/wp-content/uploads/2018/02/mail-1.png" />
               <div style={{width: 'auto',height: 'auto'}}>
                  <TwitterTimelineEmbed
                     sourceType="profile"
                     screenName="delmontz_dgl"
                     theme="dark"
                     options={{height: 1000}}
                  />
               </div>
            </Card>
         </React.Fragment>
      );
   }

}

export default withStyles(styles)(NoticeComponent);