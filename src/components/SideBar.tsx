import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Divider, Drawer, Typography, List, ListItemButton, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Functions from './Functions';

const drawerWidth = 300;

 const SideBar = (props) => {
  const [funcs, setFuncs] = useState([]);
  const [current, setCurrent] = useState('');

  const handleCurrent = (e) => {
    setCurrent(e);
  }

  console.log(current);

  const render = [];

  funcs.forEach((el, index) => {
    console.log(index)
    //insert time of when func was last invoked
    render.push(
      <List component="div" disablePadding sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Functions index={index} current={current} handleCurrent={handleCurrent} Name={el.Name} handleDataChange={props.handleDataChange} externalId={props.externalId} arn={props.arn} region={props.region} />
        <Divider />
      </List>
    )
  })


  useEffect(() => {
    axios.get('http://localhost:3000/aws/funcs', { params: { externalId: props.externalId, arn: props.arn, region: props.region }})
    .then((data) => {
      console.log(data);
      setFuncs(data.data);
    })
    .catch((err) => console.log(`Error: ${err}`))
  }, [])

  
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <Drawer
        sx={{
          width: drawerWidth,
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
        <List sx={{mt: 6}}>
          <ListItemButton onClick={handleClick}>
            <Typography sx={{fontWeight: "bold"}}>My Lambda Functions</Typography>
            {open ? <ExpandLess /> : <ExpandMore /> }
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {render}
          </Collapse>
        </List> 
      </Drawer>
    </Box>
  )
 }
 
 export default SideBar;
