import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery, ListItem, ListItemButton, ListItemText, List } from '@mui/material';
import FunctionDetails from './FunctionDetails';
import axios from 'axios';
import { useActionData } from 'react-router';

const Functions = (props) => {
const [showSlider, setShowSlider] = useState(false);
const [colorStay, setColor] = useState('white');
const [lastInvoke, setLastInvoke] = useState('');
const [lastInvokeDate, setLastInvokeDate] = useState('');
const [data, setData] = useState('')
// let passData;

// const slider = [];
// if (showSlider) {
//   slider.push(<FunctionDetails Name={props.Name} externalId={props.externalId} arn={props.arn} region={props.region}/>)
// }
console.log(props)
console.log(props.index, props.Name);

const handleClick = () => {
  // setShowSlider(!showSlider)
  if (colorStay === 'white') setColor('#E3F2FD')
  else setColor('white')
  props.handleDataChange(data);
  console.log(data);
}

const slider = [];
if (props.current === props.index) {
  slider.push(<FunctionDetails Name={props.Name} externalId={props.externalId} arn={props.arn} region={props.region}/>)
}

useEffect(() => {
  axios.get('http://localhost:3000/cloud/logs', { params: { funcName: props.Name, externalId: props.externalId, arn: props.arn, region: props.region }})
    .then((data) => {
      console.log(data);
      setLastInvoke(data.data[data.data.length - 1].Time);
      setLastInvokeDate(data.data[data.data.length - 1].Date)
      setData(data.data);
    })
    .catch((err) => console.log(`Error: ${err}`))
}, [])


return (
  <Box sx={{ width:'80%', mb: '8px'}}>
    {/* <Button variant='text'sx={{width: '100%', maxWidth:300}}>  */}
      <ListItemButton onClick={() => {handleClick(); props.handleCurrent(props.index)}} sx={{display:'flex', flexDirection: 'column', pl: 4 , borderRadius: 2, background: 'secondary' ,"&:hover":{background: 'primary'}, /*"&:focus":{background:'#E3F2FD'}*/"&:active":{background:"#90CAF9"}}}> 
        <Typography sx={{fontWeight:'bold', width:'100%'}}>{props.Name}</Typography>
        <Box sx={{display: 'flex', color: 'gray', width:'100%'}}>
          <Typography sx={{fontSize: '1em', width:'100%'}}>{lastInvokeDate}</Typography>
          <Typography sx={{fontSize: '1em', width:'100%'}}>{lastInvoke}</Typography>
        </Box>
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