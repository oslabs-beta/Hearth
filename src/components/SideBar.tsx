import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery, List, ListItem, ListItemButton, ListItemText, ThemeProvider, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Functions from './Functions';
import {theme} from '../theme/index.js'

const drawerWidth = 300;

 const SideBar = (props) => {
  const [funcs, setFuncs] = useState([]);
  // const [showFuncs, setShowFuncs] = useState(false);
  const [current, setCurrent] = useState('');

  const handleCurrent = (e) => {
    setCurrent(e);
  }

  console.log(current);

  const render = [];

  // if (showFuncs) {
    funcs.forEach((el, index) => {
      console.log(index)
      //insert time of when func was last invoked
      render.push(
        <List component="div" disablePadding sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {/* <ListItemButton sx={{ pl: 4 , width: '80%'}}> */}
            {/* <ListItemText primary={el.name} /> */}
            <Functions index={index} current={current} handleCurrent={handleCurrent} Name={el.Name} handleDataChange={props.handleDataChange} externalId={props.externalId} arn={props.arn} region={props.region} />
          {/* </ListItemButton> */}
          <Divider />
        </List>
      )
    })
  // }

  useEffect(() => {
    axios.get('http://localhost:3000/aws/funcs', { params: { externalId: props.externalId, arn: props.arn, region: props.region }})
    .then((data) => {
      console.log(data);
      setFuncs(data.data);
    })
    .catch((err) => console.log(`Error: ${err}`))
  }, [])

  // const show = () => {
    // setShowFuncs(!showFuncs);
  // }


  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <Drawer
        sx={{
          width: drawerWidth,
          // flexShrink: 0,
          // p: 2,
          mt: "100px",
          ml: "0px",
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            borderWidth: 0,
            boxSizing: 'border-box',
            backgroundColor: 'transparent' 
          },
        }}
        variant="permanent"
        anchor="left"
      >
      {/* <ThemeProvider theme={theme}>
        <Button color='primary' onClick={show} variant='contained' sx={{borderRadius: '0px'}}>My Lambda Functions</Button>
      </ThemeProvider> */}
      <List sx={{mt: 6}}>
      <ListItemButton onClick={handleClick}>
              <Typography sx={{fontWeight: "bold"}}>My Lambda Functions</Typography>
              {open ? <ExpandLess /> : <ExpandMore /> }
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {/* <List component="div" disablePadding> */}
                {/* <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Starred" />
                </ListItemButton> */}
                {render}
              {/* </List> */}
            </Collapse>
      </List> 
      </Drawer>
    </Box>
  )
 }
 
 export default SideBar;
