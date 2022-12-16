import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 42px;
`;
const Functions = (props) => {
  const [value, setValue] = React.useState<number | string | Array<number | string>>(
    30,
  );;
  const [ids, setIds] = useState({});
  const [disabled, setDisabled] = useState({});
  const [disabledInvoke, setDisabledInvoke] = useState({})
  // const [invoked, setInvoked] = useState({})

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
    axios.get('http://localhost:3000/aws/invokefuncs', { params: { funcName: props.funcName, externalId: props.externalId, arn: props.arn, region: props.region }})
      .then((data) => {
        console.log(data)
      })
      .catch((err) => console.log(`Error: ${err}`))
  }

  const handleWarmFunction = () => {
    warmFunc();

    if (typeof(value) === 'number'){
      // don't forget to change from 10sec after demo
      const id = setInterval(warmFunc, 5000 * value);

      const idsClone: {name?: string, id?: ReturnType<typeof setTimeout>} = {...ids}
      idsClone[props.funcName] = id
      setIds(idsClone);

      const disabledClone: {name?: string, disabled?: boolean} = {...disabled};
      disabledClone[props.funcName] = false
      setDisabled(disabledClone);

      const disabledInvokeClone = {...disabledInvoke};
      disabledInvokeClone[props.funcName] = true;
      setDisabledInvoke(disabledInvokeClone);
    }
  }
  
  const handleStopWarming = () => {
    clearInterval(ids[props.funcName])
    
    const disabledClone: {name?: string, disabled?: boolean} = {...disabled};
    disabledClone[props.funcName] = true
    setDisabled(disabledClone);

    const disabledInvokeClone = {...disabledInvoke};
    disabledInvokeClone[props.funcName] = false;
    setDisabledInvoke(disabledInvokeClone);
  }

  const onChange = (e) => {
    e.preventDefault();
    setValue(e.target.value)
    
    const disabledInvokeClone = {...disabledInvoke};
    disabledInvokeClone[props.funcName] = false;
    setDisabledInvoke(disabledInvokeClone);
  }
  
  return (
    <div>
      <h2>{props.funcName}</h2>
      <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Set Lambda Function Warming Interval
      </Typography>
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
      <button onClick={handleWarmFunction} disabled={disabledInvoke[props.funcName]}>Warm Function</button>
      <button onClick={handleStopWarming} disabled={disabled[props.funcName]}>Stop Function Warming</button>
    </div>

  )
}

export default Functions;
