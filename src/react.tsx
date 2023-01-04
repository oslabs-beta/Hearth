import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from "react-router-dom";
 


const Index = () => {
  return(
    <HashRouter>
      <App />
    </HashRouter>
  )
};
 
ReactDOM.render(<Index />, document.getElementById('app'));