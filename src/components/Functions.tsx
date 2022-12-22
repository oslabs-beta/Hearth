import * as React from 'react';
import { useState, useRef } from 'react';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery, ListItem, ListItemButton, ListItemText, List } from '@mui/material';
import FunctionDetails from './FunctionDetails';

const Functions = (props) => {
const [showSlider, setShowSlider] = useState(false);

const slider = [];
if (showSlider) {
  slider.push(<FunctionDetails Name={props.Name} externalId={props.externalId} arn={props.arn} region={props.region}/>)
}

const handleClick = () => {
  setShowSlider(!showSlider)
}


return (
  <Box sx={{ width:'100%'}}>
    {/* <Button variant='text'sx={{width: '100%', maxWidth:300}}>  */}
      <ListItemButton onClick={handleClick}> 
        <ListItemText primary={props.Name} sx={{fontWeight:'bold', width:'100%'}}></ListItemText>
      </ListItemButton>
    {/* </Button> */}
    {/* <Box> */}
    {slider}
    {/* </Box> */}
    {/* <Divider/> */}
  </Box>
)
}

export default Functions;