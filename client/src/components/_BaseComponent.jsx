import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
});

class _BaseComponent extends React.Component{
   
   constructor(props){
      super(props);
   }

   render(){
      const { classes } = this.props;

      return (
         <h1>Hello World</h1>
      );
   }

}

export default withStyles(styles)(_BaseComponent);