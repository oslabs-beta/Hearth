import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import Button from '@mui/material/Button';

const Input = styled(MuiInput)`
  width: 42px;
`;
const FunctionDetails = (props) => {
  const [value, setValue] = React.useState<number | string | Array<number | string>>(
    5,
  );;

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 60) {
      setValue(60);
    }
  };
  
  const warmFunc = () => {
    axios.get('http://localhost:3000/aws/invokefuncs', { params: { funcName: props.Name, externalId: props.externalId, arn: props.arn, region: props.region }})
      .then((data) => {
        console.log(data)
      })
      .catch((err) => console.log(`Error: ${err}`))
  }

  const handleWarmFunction = () => {
    warmFunc();

    if (typeof(value) === 'number'){
      const timeout = 60000 * value
      const id = setInterval(warmFunc, timeout);

      const idsClone: {name?: string, id?: ReturnType<typeof setTimeout>} = {...props.ids}
      idsClone[props.Name] = id
      props.handleIds(idsClone);

      props.handleWarmButtons();
    }
  }
  
  const handleStopWarming = () => {
    clearInterval(props.ids[props.Name])

    props.handleWarmButtons();
  }
  
  return (
    <div>
      <Box sx={{ width: 250 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max={60}
            min={1}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            sx={{mr: '3px'}}
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 1,
              max: 60,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
      <div style={{display: 'flex', justifyContent:'space-between'}}> 
        <Button onClick={handleWarmFunction} disabled={props.warmed} size='small' style={{backgroundColor: 'transparent', border: 'none', borderRight:'1px solid gray', cursor:'pointer', borderRadius:'0px'}}>Warm Function</Button>
        <Button onClick={handleStopWarming} disabled={props.stopInvoke} size='small' style={{padding:'0', backgroundColor: 'transparent', border: 'none', cursor:'pointer', borderRadius:'0px'}}>Stop Function Warming</Button>
      </div>
    </div>

  )
}

export default FunctionDetails;


//functionDetails contains the slider, warm & stop button