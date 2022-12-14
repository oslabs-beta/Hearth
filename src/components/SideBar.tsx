import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';


 const SideBar = (props) => {
  const [funcs, setFuncs] = useState([]);
  const [showFuncs, setShowFuncs] = useState(false);

  const render = [];
  if (showFuncs) {
    funcs.forEach(el => {
      //insert time of when func was last invoked
      render.push(<div onClick={() => props.handleClick(el.Name)}><p>{el.Name}</p></div>)
    })
  }

  useEffect(() => {
    axios.get('http://localhost:3000/aws/funcs')
    .then((data) => {
      console.log(data);
      setFuncs(data.data);
    })
    .catch((err) => console.log(`Error: ${err}`))
  }, [])

  const show = () => {
    setShowFuncs(!showFuncs);
  }

  return (
    <div>
      <button onClick={show}>My Lambda Functions</button>
      {render}
    </div>

  )
 }
 
 export default SideBar;