import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useRef } from 'react';

const Login = (props) => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username: (document.getElementById('username') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value
    }
    //UNCOMMENT WHEN THE SERVER IS SET UP
    /*
    const reqBody = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }

    const result = await fetch('/api/user/login', reqBody);
    const data = await result.json();
    
    if(data.result === true) {
      navigate('/main');
    } else {
      alert('Incorrect username or password');
    }
    */
    if(userData.username === 'code' && userData.password === 'smith') {
      navigate('/main');
    } else {
      alert('Incorrect username or password');
    }
  };

  return (
    <form className='loginForm' >
      <div className='box'>
        <h1>Hearth</h1>
        <div className='inputs'>
          <input className="inputLogin" type="text" id="username" onChange={props.handleUserChange} placeholder='username'></input>
          <input className="inputLogin" type="password" id="password" placeholder='password'></input>
          <button onClick={handleSubmit} className="loginBtn" type="submit">Log in</button>
        </div>
        {/* <div className='redirect'>
          <span className="redirectButton">Don't have an account? <Link id='link' to='/signup'>Sign Up Here</Link></span>
        </div> */}
      </div>
    </form>
  );
};

export default Login;