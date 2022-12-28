import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, ListItemButton } from '@mui/material';
import FunctionDetails from './FunctionDetails';
import axios from 'axios';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Functions = (props) => {
const [colorStay, setColor] = useState('white');
const [lastInvoke, setLastInvoke] = useState('');
const [lastInvokeDate, setLastInvokeDate] = useState('');
const [data, setData] = useState('')
const [warmed, setWarmed] = useState(false);
const [stopInvoke, setStopInvoke] = useState(true);
const [ids, setIds] = useState({});

const handleClick = () => {
  if (colorStay === 'white') setColor('#E3F2FD')
  else setColor('white')
  props.handleDataChange(data);
}

const handleWarmButtons = () => {
  setWarmed(!warmed);
  setStopInvoke(!stopInvoke);
}

const handleIds = (e) => {
  setIds(e);
}

const slider = [];
if (props.current === props.index) {
  slider.push(<FunctionDetails Name={props.Name} externalId={props.externalId} arn={props.arn} region={props.region} handleWarmButtons={handleWarmButtons} warmed={warmed} stopInvoke={stopInvoke} ids={ids} handleIds={handleIds}/>)
}

useEffect(() => {
  axios.get('http://localhost:3000/cloud/logs', { params: { funcName: props.Name, externalId: props.externalId, arn: props.arn, region: props.region }})
    .then((data) => {
      // console.log(data);
      setLastInvoke(data.data[data.data.length - 1].Time);
      setLastInvokeDate(data.data[data.data.length - 1].Date)
      setData(data.data);
    })
    .catch((err) => console.log(`Error: ${err}`))
}, [])

let date = new Date(`${lastInvokeDate} ${lastInvoke} UTC`);
date.toLocaleString();

const dates = [];
if (lastInvokeDate) {
  dates.push(
    <Typography sx={{fontSize: '0.8em', width:'100%'}}>{`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`}</Typography>)
  dates.push(
    <Typography sx={{fontSize: '0.8em', width:'100%'}}>{`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</Typography>
  )
}

return (
  <Box sx={{ width:'80%', mb: '8px'}}>
      <ListItemButton onClick={() => {handleClick(); props.handleCurrent(props.index)}} sx={{display:'flex', flexDirection: 'column', pl: 4 , borderRadius: 2, background: 'secondary' ,"&:hover":{background: 'primary'}, /*"&:focus":{background:'#E3F2FD'}*/"&:active":{background:"#90CAF9"}}}> 
        <Typography sx={{fontWeight:'bold', width:'100%'}}>{props.Name}</Typography>
        <Box sx={{display: 'flex', alignItems: 'center', color: 'gray', width:'100%'}}>
          <AccessTimeIcon sx={{fontSize: 'small', mr: '2px'}}/>
          {dates}
        </Box>
      </ListItemButton>
    {slider}
  </Box>
)
}

export default Functions;