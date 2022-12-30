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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

const Main = (props) => {
  const [logData, setData] = useState('');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const home = [];
  home.push(
      <div id='home' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '60%', marginBottom: '10px'}}>
        {/* <Typography sx={{fontSize: '70px', fontWeight: 'bold', ml: 3, fontColor: "#f26419"}} variant='h6'>Welcome</Typography> */}
        <img id='hearth' src='./../src/logo.png' height="270" width="450" />
      </div>
    )

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const funcHome = [];
  funcHome.push(
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%'}}>
      <div style={{background: 'white', borderRadius: '10px', padding: '5px'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
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
          {/* <div style={{height: '60%', marginBottom: '10px'}}> */}
          {!logData ? home : funcHome}
          {/* </div> */}
        </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Main
