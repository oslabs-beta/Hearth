import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import Button from '@mui/material/Button';

const Input = styled(MuiInput)`
  width: 42px;
`;
const FunctionDetails = (props) => {
  const [value, setValue] = React.useState<number | string | Array<number | string>>(
    30,
  );;
  const [ids, setIds] = useState({});

  const [disabled, setDisabled] = useState(true);
  const [disabledInvoke, setDisabledInvoke] = useState(false)

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
      // don't forget to change from 10sec after demo
      const timeout = 5000 * value
      const id = setInterval(warmFunc, timeout);

      const idsClone: {name?: string, id?: ReturnType<typeof setTimeout>} = {...ids}
      idsClone[props.Name] = id
      setIds(idsClone);

      setDisabled(false);
      setDisabledInvoke(true);
    }
  }
  
  const handleStopWarming = () => {
    clearInterval(ids[props.Name])

    setDisabled(true);
    setDisabledInvoke(false);
  }

  // const onChange = (e) => {
  //   e.preventDefault();
  //   setValue(e.target.value)
    
  //   const disabledInvokeClone = {...disabledInvoke};
  //   disabledInvokeClone[props.Name] = false;
  //   setDisabledInvoke(disabledInvokeClone);
  // }
  
  return (
    <div>
      {/* <h2>{props.Name}</h2> */}
      <Box sx={{ width: 250 }}>
      {/* <Typography id="input-slider" gutterBottom>
        Set Lambda Function Warming Interval
      </Typography> */}
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
      {/* <p>{value}</p> */}
      <div style={{display: 'flex', justifyContent:'space-between'}}> 
        <Button onClick={handleWarmFunction} disabled={disabledInvoke} size='small' style={{backgroundColor: 'transparent', border: 'none', borderRight:'1px solid gray', cursor:'pointer', borderRadius:'0px'}}>Warm Function</Button>
        <Button onClick={handleStopWarming} disabled={disabled} size='small' style={{padding:'0', backgroundColor: 'transparent', border: 'none', cursor:'pointer', borderRadius:'0px'}}>Stop Function Warming</Button>
      </div>
    </div>

  )
}

export default FunctionDetails;


//functionDetails contains the slider, warm & stop button