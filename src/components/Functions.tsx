import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, ListItemButton } from '@mui/material';
import FunctionDetails from './FunctionDetails';
import axios from 'axios';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface Props {
  handleFunctionClick: (name: string) => void;
  index: number;
  current: string | number;
  handleCurrent: (current: number) => void;
  Name: string;
  handleDataChange: (data: Object) => void;
  externalId: string;
  arn: string;
  region: string;
}

const Functions = (props: Props) => {
// const [colorStay, setColor] = useState('white');
// date and time of when the function was last invoked
const [lastInvokeTime, setLastInvokeTime] = useState('');
const [lastInvokeDate, setLastInvokeDate] = useState('');
// function logs from AWS lambda
const [data, setData] = useState('')
// state of if the function is currently being warmed
const [warmed, setWarmed] = useState(false);
// state of current status of the function (whether or not it's being invoked) 
const [stopInvoke, setStopInvoke] = useState(true);
// an object of setInterval ids for each function
const [ids, setIds] = useState({});

const handleClick = () => {
  // if (colorStay === 'white') setColor('#E3F2FD')
  // else setColor('white')
  props.handleDataChange(data);
}

// change warmed and stopInvoke state when buttons are clicked 
const handleWarmButtons = () => {
  setWarmed(!warmed);
  setStopInvoke(!stopInvoke);
}

// saves the setInterval ids for each function that's being warmed into state
const handleIds = (e) => {
  setIds(e);
}

//if function is warmed, render fire icon next to function name
const fire = [];
if (warmed) {
  fire.push(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" className="bi bi-fire" viewBox="0 0 16 16">
              <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
            </svg>)
}

//if function is clicked, show slider for that function
const slider = [];
if (props.current === props.index) {
  slider.push(<FunctionDetails Name={props.Name} externalId={props.externalId} arn={props.arn} region={props.region} handleWarmButtons={handleWarmButtons} warmed={warmed} stopInvoke={stopInvoke} ids={ids} handleIds={handleIds}/>)
}

// get request for the AWS Lamda logs 
useEffect(() => {
  axios.get('http://localhost:3000/cloud/logs', { params: { funcName: props.Name, externalId: props.externalId, arn: props.arn, region: props.region }})
    .then((data) => {
      // console.log(data);
      setLastInvokeTime(data.data[0].Time);
      setLastInvokeDate(data.data[0].Date)
      setData(data.data);
    })
    .catch((err) => console.log(`Error: ${err}`))
}, [])

const dates = [];
if (lastInvokeDate) {
  dates.push(
    <Typography sx={{fontSize: '0.8em', width:'100%'}}>{lastInvokeDate}</Typography>)
  dates.push(
    <Typography sx={{fontSize: '0.8em', width:'100%'}}>{lastInvokeTime}</Typography>
  )
}

return (
  <Box sx={{ width:'80%', mb: '8px'}}>
      <ListItemButton onClick={() => {handleClick(); props.handleCurrent(props.index); props.handleFunctionClick(props.Name)}} sx={{display:'flex', flexDirection: 'column', pl: 4 , borderRadius: 2, background: 'secondary' ,"&:hover":{background: 'primary'}, "&:active":{background:"#90CAF9"}, alignItems:'flex-start'}}> 
        <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
          <Typography sx={{fontWeight:'bold', width:'100%', textAlign: 'left'}}>{props.Name}</Typography> 
          {fire}
        </Box>
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