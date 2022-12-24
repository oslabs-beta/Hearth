import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import FunctionDetails from './FunctionDetails';
import Duration from './durationChart';
import {Typography} from '@mui/material'
import { display, height } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const Main = (props) => {
  const [logData, setData] = useState('');

  const home = [];
  home.push(
    <div id='home' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%'}}>
      {/* <Typography sx={{fontSize: '70px', fontWeight: 'bold', ml: 3, fontColor: "#f26419"}} variant='h6'>Welcome</Typography> */}
      <img id='hearth' src='./../src/logo.png' height="270" width="450" />
    </div>)

  // const funcHome = [];
  // funcHome.push(
  //   <FunctionDetails funcName={funcName} externalId={props.externalId} arn={props.arn} region={props.region}/>
  // )

  const funcHome = [];
  funcHome.push(
    <div>
      <Duration logData={logData} />
    </div>
  )
  
  
  const handleDataChange = (data) => {
    setData(data);
  }

  const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
  const themeMode = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <div id='main' style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', alignItems: 'center', height: '40px', justifyContent: 'center', marginRight: '12px'}}>
        <img src='./../src/logo2.jpeg' width='40px' height='30px'/>
        <h1>Hearth</h1>
        {/* <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            borderRadius: 1,
            p: 3,
          }}
        >
          {themeMode.palette.mode} mode
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {themeMode.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box> */}
      </div>
      
      <div style={{display: 'flex', width: '99%', height: '100%'}}>
      <div>
        <SideBar handleDataChange={handleDataChange} externalId={props.externalId} arn={props.arn} region={props.region}/>
      </div>
      <div style={{width: '80%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor:'#FBE9E7', borderRadius: '20px', borderBottomLeftRadius:'0', borderBottomRightRadius:'0'}}>
        <div style={{height: '60%', marginBottom: '10px'}}>
        {!logData ? home : funcHome}
        </div>
      </div>
      </div>
    </div>

  )
}

  
export default Main;