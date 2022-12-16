import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery, ListItem, ListItemButton, ListItemText } from '@mui/material';


// PropTypes
/*

import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import { Logo } from './logo';
import { NavItem } from './nav-item';
*/

const drawerWidth = 260;

 const SideBar = (props) => {
  const [funcs, setFuncs] = useState([]);
  const [showFuncs, setShowFuncs] = useState(false);

  const render = [];
  if (showFuncs) {
    funcs.forEach(el => {
      //insert time of when func was last invoked
      render.push(
      // <div onClick={() => props.handleClick(el.Name)}><p>{el.Name}</p></div>
      <Box onClick={() => props.handleClick(el.Name)}>
        <Box>
          <ListItemButton>
            <ListItemText primary={el.Name} sx={{fontWeight:'bold'}} />
          </ListItemButton>
        </Box>
        <Divider />
      </Box>
      )
    })
  }

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

  return (
    <Box sx={{flexGrow:1}}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          p: 2,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'transparent',
          },
        }}
        variant="permanent"
        anchor="left"
      >
      <Button color='primary' onClick={show} variant='contained'>My Lambda Functions</Button>
      {render}  
      </Drawer>
    </Box>
  )
 }
 
 export default SideBar;