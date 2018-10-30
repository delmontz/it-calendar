import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Provider } from 'mobx-react';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import EventStore from '../logic/EventStore'
import Body from '../components/BodyComponent';

const eventStore = new EventStore();

const styles = theme => ({
   root: {
      width: 'auto',
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2
   },
   toolbarMain: {
      borderBottom: `5px solid ${theme.palette.grey[300]}`
   },
   toolbarTitle: {
      flex: 1,
   },
   mainFeaturedPost: {
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing.unit * 4,
   },
   mainFeaturedPostContent: {
      padding: `${theme.spacing.unit * 6}px`
   },
   media: {
      width: '100%',
      height: '500px',
      marginBottom: '20px',
      marginTop: '20px'
   }
});

class AppContainer extends React.Component {

   constructor(props) {
      super(props);
   }

   render() {
      const { classes } = this.props;
      const slider_config = {
         dots: true,
         infinite: true,
         speed: 500,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay: true,
         autoplaySpeed: 2500
      };

      return (
         <Provider  eventStore={eventStore}>
            <div className={classes.root}>
               <Toolbar className={classes.toolbarMain}>
                  <Typography
                     variant="h2"
                     color="inherit"
                     align="center"
                     noWrap
                     className={classes.toolbarTitle}
                  >
                     Geek Calendar 開発版
                  </Typography>
               </Toolbar>
               <main>
               {/* Main featured post */}
                  <div>
                     <img src="https://dgl.tokyo/wp-content/uploads/2018/01/h_DSC_0975-1.jpg" className={classes.media} />
                  </div>
                  <Body />
               {/* End main featured post */}
               </main>
            </div>
         </Provider>
      );
   }
}

export default withStyles(styles)(AppContainer);