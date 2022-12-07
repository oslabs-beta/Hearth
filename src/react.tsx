// src/react.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
 
const Index = () => {
    return <div>Hello React!</div>;
};
 
ReactDOM.render(<Index />, document.getElementById('app'));


/*
import { HashRouter } from 'react-router-dom';
 DO WE NEED TO IMPORT THIS
i think so lol but idk cause they didn't show them making it in theirs
article or video
article
import React from 'react';
import { render } from 'react-dom';
*/

/*
render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
)
*/