import * as React from 'react';
import { useState } from 'react';
import SideBar from './SideBar';
import Duration from './durationChart';
import LogTable from './LogTable';
import { ThemeProvider, createTheme, CssBaseline, Tabs, Tab, Typography, useMediaQuery, Box, backdropClasses } from '@mui/material';
import BilledDuration from './billedDurationChart';
import MaxMemUsed from './maxMemUsedChart';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

//chart's tabs
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


interface MainProps {
  username: string;
  arn: string;
  region: string;
  externalId: string;
}

const Main = (props: MainProps) => {
  // create state for the logs
  const [logData, setData] = useState('');
  // updates log when function is clicked in sidebar
  const [functionClick, setFunctionClick] = useState('');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  // changes functionClick to be the current function that's clicked on
  const handleFunctionClick = (name) => {
    setFunctionClick(name);
  }

  // home page when there's no data for functions / when no functions are clicked on
  const home = [];
  home.push(
      <div id='home' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '60%', marginBottom: '10px'}}>
        <img id='hearth' src='./../src/logo.png' height="270" width="450" />
      </div>
  )

  // state for the tab panels
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // shows graphs and logs in the home page when functions that have data are clicked on
  const funcHome = [];
  funcHome.push(
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%'}}>
      <div style={{ background: 'white', borderRadius: '10px', padding: '5px'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Duration" {...a11yProps(0)} />
            <Tab label="Billed Duration" {...a11yProps(1)} />
            <Tab label="Max Mem Used" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Duration logData={logData}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <BilledDuration logData={logData} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MaxMemUsed logData={logData} />
        </TabPanel>
      </div>
      <LogTable logData={logData} functionClick={functionClick}/>
    </div>
  )

  //pass down graph data
  const handleDataChange = (data) => {
    setData(data);
  }

  // dark mode theme
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          ...(prefersDarkMode === true) ? {
          primary: {
            main: "#8ecae6" //light blue
          },
          secondary: {
            main: "#FFB347" //orange
          },
          text: {
            // primary: '#FFB347',
            secondary: '#FFB347'
          },
          }
          :
          {
            primary: {
              main: "#8ecae6" //light blue
            },
            secondary: {
              main: "#FFB347" //orange
            },
          }
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div id='main' style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', alignItems: 'center', height: '40px', justifyContent: 'space-between', marginRight: '12px'}}>
          <div></div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <img src='./../src/logo2.png' width='40px' height='30px'/>
            <h1>Hearth</h1>
          </div>
          <div style={{display: 'flex', alignItems: 'center', marginRight: '3px', width: '80px', justifyContent: 'space-between'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#8ecae6" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
            <p>{props.username}</p>
          </div>
        </div>

        <div style={{display: 'flex', width: '99%', height: '100%'}}>
        <div>
          <SideBar handleFunctionClick={handleFunctionClick} handleDataChange={handleDataChange} externalId={props.externalId} arn={props.arn} region={props.region}/>
        </div>
        <div style={{width: '80%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor:'#fff2e3', borderRadius: '20px', borderBottomLeftRadius:'0', borderBottomRightRadius:'0'}}>
          {!logData ? home : funcHome}
        </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Main
