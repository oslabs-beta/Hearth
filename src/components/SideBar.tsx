import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Divider, Drawer, Typography, List, ListItemButton, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Functions from './Functions';

const drawerWidth: number = 300;


interface Props {
  handleFunctionClick: (event: string) => void;
  handleDataChange: (data: object) => void;
  externalId: string;
  arn: string;
  region: string;
}

 const SideBar = (props: Props) => {
  const [funcs, setFuncs] = useState<Array<any>>([]);
  const [current, setCurrent] = useState<string | number>('');

  // sets the current function that's open by function's index
  const handleCurrent = (e) => {
    setCurrent(e);
  }

  // console.log(current);

  const render: React.ReactElement[] = [];

  //iterate through the array of functions
  funcs.forEach((el, index) => {
    // console.log(index)
    render.push(
      <List component="div" disablePadding sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Functions handleFunctionClick={props.handleFunctionClick} index={index} current={current} handleCurrent={handleCurrent} Name={el.Name} handleDataChange={props.handleDataChange} externalId={props.externalId} arn={props.arn} region={props.region} />
        <Divider />
      </List>
    )
  })


  useEffect(() => {
    // get request to grab all the AWS lambda functions and save them in state
    axios.get('https://hearth-373718.wl.r.appspot.com/aws/funcs', { params: { externalId: props.externalId, arn: props.arn, region: props.region }})
    .then((data) => {
      //console.log(data);
      setFuncs(data.data);
    })
    .catch((err) => console.log(`Error: ${err}`))
  }, [])

  
  const [open, setOpen] = React.useState<boolean>(false);

  //if drawer is clicked reassign state to true or false
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
        <List sx={{mt: 5}}>
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
