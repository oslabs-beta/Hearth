import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
// import SignUp from './components/SignUp';
// import Main from './components/Main';



const App = () => {
  return (
    <div className='router'>
      <main>
        <Routes>
          <Route path='/' element={ <Login /> } />
          {/* <Route path='/signup' element={SignUp} />
          <Route path='/main' element={Main} /> */}
        </Routes>
      </main>
    </div>
  )
}

export default App;