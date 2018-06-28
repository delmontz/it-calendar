import React from 'react';

export default class TestComponent extends React.Component{
   
   constructor(props){
      super(props);
      this.name = 'hogehoge';
   }

   render(){
      return(
         <div>{this.name}</div>
      );
   }

}