import * as React from 'react';
import { useState } from 'react';
import SideBar from './SideBar';
import Duration from './durationChart';
import LogTable from './LogTable';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useMediaQuery from '@mui/material/useMediaQuery';
import {CssBaseline} from '@mui/material';
import BilledDuration from './billedDurationChart';
import MaxMemUsed from './maxMemUsedChart';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const Main = (props) => {
  const [logData, setData] = useState('');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const home = [];
  home.push(
    <div id='home' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%'}}>
      {/* <Typography sx={{fontSize: '70px', fontWeight: 'bold', ml: 3, fontColor: "#f26419"}} variant='h6'>Welcome</Typography> */}
      <img id='hearth' src='./../src/logo.png' height="270" width="450" />
    </div>)

  const funcHome = [];
  funcHome.push(
    <div style={{background: 'white', borderRadius: '10px', padding: '5px'}}>
      <Duration logData={logData}/>
      <BilledDuration logData={logData} />
      <MaxMemUsed logData={logData} />
      <LogTable logData={logData}/>
    </div>
  )

  //pass down graph data
  const handleDataChange = (data) => {
    setData(data);
  }

  // const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: "#8ecae6" //light blue
          },
          secondary: {
            main: "#FFB347" //orange
          },
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div id='main' style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', alignItems: 'center', height: '40px', justifyContent: 'center', marginRight: '12px'}}>
          <img src='./../src/logo2.png' width='40px' height='30px'/>
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
            {theme.palette.mode} mode
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
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
    </ThemeProvider>
  )
}

export default Main
