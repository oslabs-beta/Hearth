import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import Functions from './Functions';


const Main = (props) => {
  const [funcName, setFuncName] = useState('');

  const home = [];
  home.push(
    <div id='home' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
    <div id='main' style={{display: 'flex'}}>
      <div>
      <SideBar handleClick={handleClick} externalId={props.externalId} arn={props.arn} region={props.region}/>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', width: '100%', height: '100%', marginTop: '10px'}}>
        <div>
          {funcName ? funcHome : home}
        </div>
      </div>
    </div>

  )
}

  
export default Main;