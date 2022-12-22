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
  const [showFuncs, setShowFuncs] = useState(false);

  const render = [];

  // if (showFuncs) {
    funcs.forEach(el => {
      //insert time of when func was last invoked
      render.push(
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            {/* <ListItemText primary={el.name} /> */}
            <Functions Name={el.Name} /*handleClick={props.handleClick}*/ externalId={props.externalId} arn={props.arn} region={props.region} />
          </ListItemButton>
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

  const show = () => {
    setShowFuncs(!showFuncs);
  }


  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{flexGrow:1}}>
      <Drawer
        sx={{
          width: drawerWidth,
          // flexShrink: 0,
          // p: 2,
          mt: "0px",
          ml: "0px",
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            borderWidth: 0,
            boxSizing: 'border-box',
            backgroundColor: 'white',
          },
        }}
        variant="permanent"
        anchor="left"
      >
      {/* <ThemeProvider theme={theme}>
        <Button color='primary' onClick={show} variant='contained' sx={{borderRadius: '0px'}}>My Lambda Functions</Button>
      </ThemeProvider> */}
      <List>
      <ListItemButton onClick={handleClick}>
              <ListItemText primary="My Lambda Functions" />
              {open ? <ExpandLess /> : <ExpandMore />}
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
