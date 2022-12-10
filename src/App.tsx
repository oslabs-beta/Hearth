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

  return (
    <div className='router'>
      <main>
        <Routes>
          <Route path='/' element={ <Login username={username} setUsername={setUsername} handleUserChange={handleUserChange} /> } />
          <Route path='/signup' element={< SignUp />} />
          <Route path='/main' element={<Main username={username} setUsername={setUsername} handleUserChange={handleUserChange}/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App;