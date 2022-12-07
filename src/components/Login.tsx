import * as React from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {

  return (
    <form className='loginForm' >
      <div className='box'>
        <h1>Hearth</h1>
        <div className='inputs'>
          <input className="inputUser" type="text" id="username" placeholder='username'></input>
          <input className="inputPW" type="password" id="password" placeholder='password'></input>
          <button className="loginBtn" type="submit">Log in</button>
        </div>
        <div className='redirect'>
          {/* <span className="redirectButton">Don't have an account? <Link id='link' to='/signup'>Sign Up Here</Link></span> */}
        </div>
      </div>
    </form>
  );
};

export default Login;