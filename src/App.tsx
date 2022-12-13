import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import { useState, useEffect } from 'react';
import SignUp from './components/SignUp';
import Main from './components/Main';



const App = () => {

  const [username, setUsername] = useState('');
  const handleUserChange = (event) => {
    const {
      target: {value},
    } = event;
    setUsername(value);
  };

  const [region, setRegion] = useState('');
  const handleRegionChange = (newRegion) => {
    setRegion(newRegion);
  };
  
  const [externalId, setExternalId] = useState('');
  const handleExternalIdChange = (newExternalId) => {
    setExternalId(newExternalId);
  };

  const [arn, setArn] = useState('');
  const handleArnChange = (newArn) => {
    setArn(newArn);
  };


  return (
    <div className='router'>
      <main>
        <Routes>
          <Route path='/' element={<Login username={username} setUsername={setUsername} handleUserChange={handleUserChange} region={region} setRegion={setRegion} handleRegionChange={handleRegionChange} externalId={externalId} setExternalId={setExternalId} handleExternalIdChange={handleExternalIdChange} arn={arn} setArn={setArn} handleArnChange={handleArnChange}/>} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/main' element={<Main username={username} arn={arn} region={region} externalId={externalId} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App;