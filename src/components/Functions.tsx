import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Functions = (props) => {
  const [value, setValue] = useState(1);
  const [ids, setIds] = useState({});
  const [disabled, setDisabled] = useState({});
  const [disabledInvoke, setDisabledInvoke] = useState({})
  // const [invoked, setInvoked] = useState({})
  
  const warmFunc = () => {
    axios.get('http://localhost:3000/aws/invokefuncs', { params: { funcName: props.funcName, externalId: props.externalId, arn: props.arn, region: props.region }})
      .then((data) => {
        console.log(data)
      })
      .catch((err) => console.log(`Error: ${err}`))
  }

  const handleWarmFunction = () => {
    warmFunc();

    const id = setInterval(warmFunc, 60000 * value);

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
      <p>{props.funcName}</p>
      <input type='range' min="1" max="60" id='range' step='1' onChange={onChange}/>
      <p>{value}</p>
      <button onClick={handleWarmFunction} disabled={disabledInvoke[props.funcName]}>Warm Function</button>
      <button onClick={handleStopWarming} disabled={disabled[props.funcName]}>Stop Function Warming</button>
    </div>

  )
}

export default Functions;