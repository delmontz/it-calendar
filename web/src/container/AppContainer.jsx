import React from 'react';

import Pre from '../components/TestComponent';

export default class AppComponent extends React.Component{
   
   constructor(props){
      super(props);
   }

   render(){
      return(
         <div>
            <Pre />
         </div>
      );
   }

}