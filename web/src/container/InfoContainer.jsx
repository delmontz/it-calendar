import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#D5E8D4'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  card: {
    maxHeight: 800
  },
  media: {
    maxHeight: 200,
    paddingTop: '56.25%' // 16:9
  }
});

class InfoContainer extends React.Component{
   
   constructor(props){
      super(props);
   }

   render(){
      return (
        <div className={this.props.classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper className={this.props.classes.paper}>　ギークカレンダー（仮）</Paper>
            </Grid>
            <Grid item xs={12}>
              <Card className={this.props.classes.card}>
                <CardMedia
                  className={this.props.classes.media}
                  title="Contemplative Reptile"
                >
                <img src="https://dgl.tokyo/wp-content/uploads/2018/01/h_DSC_0975-1.jpg"/>
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                  Lizard
                  </Typography>
                  <Typography component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
       );
   }

}

export default withStyles(styles)(InfoContainer);