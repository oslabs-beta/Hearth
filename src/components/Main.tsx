import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import FunctionDetails from './FunctionDetails';
import Duration from './durationChart';
import {Typography} from '@mui/material'
import { display } from '@mui/system';
import NavBar from './NavBar';


const Main = (props) => {
  const [funcName, setFuncName] = useState('');

  const home = [];
  home.push(
    <div id='home' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%'}}>
      <Typography sx={{fontSize: '70px', fontWeight: 'bold', ml: 3, fontColor: "#f26419"}} variant='h6'>Hearth</Typography>
      <img src='./../src/logo.png' height="270" width="450" />
    </div>)

  // const funcHome = [];
  // funcHome.push(
  //   <FunctionDetails funcName={funcName} externalId={props.externalId} arn={props.arn} region={props.region}/>
  // )
  
  
  // const handleClick = (e) => {
  //   setFuncName(e);
  // }

  return (
    <div id='main' style={{height: '100%'}}>
      
      <div style={{display: 'flex', width: '99%', height: '100%'}}>
      <div>
        <SideBar /*handleClick={handleClick}*/ externalId={props.externalId} arn={props.arn} region={props.region}/>
      </div>
      {/* <div style={{display: 'flex', justifyContent: 'center', width: '100%', height: '100%', marginTop: '10px'}}> */}
      <div style={{width: '80%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor:'#FBE9E7', borderRadius: '20px', borderBottomLeftRadius:'0', borderBottomRightRadius:'0'}}>
        <div style={{height: '60%', marginBottom: '10px'}}>
        {home}
        </div>
        {/* <Duration /> */}
      </div>
      </div>
    </div>

  )
}

  
export default Main;