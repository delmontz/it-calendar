import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from './container/AppContainer'

const theme = createMuiTheme({
   palette: {
     primary: {
       light: '#63ccff',
       main: '#039be5',
       dark: '#006db3',
       contrastText: '#000',
     },
     secondary: {
       light: '#ffc947',
       main: '#ff9800',
       dark: '#c66900',
       contrastText: '#000',
     },
   },
 });

ReactDOM.render(
   <MuiThemeProvider theme={theme}>
      <App />
   </MuiThemeProvider>
   ,
   document.getElementById('app_container')
);
