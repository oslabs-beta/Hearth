import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import Functions from './Functions';


const Main = (props) => {
  const [funcName, setFuncName] = useState('');

  const home = [];
  home.push(
    <div>
      <h1>Welcome to Hearth</h1>
      <img src='/Users/linda/Hearth/src/logo.png' height="300" width="450" />
    </div>)

  const funcHome = [];
  funcHome.push(
    <Functions funcName={funcName} externalId={props.externalId} arn={props.arn} region={props.region}/>
  )
  
  const handleClick = (e) => {
    setFuncName(e);
  }

  return (
    <div id='main'>
      <SideBar handleClick={handleClick} externalId={props.externalId} arn={props.arn} region={props.region}/>
      {/* <div> */}
      {funcName ? funcHome : home}
        {/* {home} */}
      {/* </div> */}
    </div>

  )
}

  
export default Main;