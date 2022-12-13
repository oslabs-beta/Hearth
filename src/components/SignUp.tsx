import * as React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const SignUp = (props) => {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username: (document.getElementById('username') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
      arn: (document.getElementById('password') as HTMLInputElement).value,
      // region: (document.getElementById('password') as HTMLInputElement).value,
      //CHANGE THIS TO BE THE EXTERNAL IDexternalId: (document.getElementById('password') as HTMLInputElement).value
    }

    const reqBody = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }
    const result = await fetch('api/user/signup', reqBody);
    const data = await result.json();
    //add logic to see if everything is a valid username and password
    navigate('/');
  }

  return (
    <form className='signUpForm' >
      <div className='box' >
        <h1>Hearth</h1>
        <div className='inputs' >
          <input className='inputSignUp' type='text' id='username' placeholder='Username'></input>
          <input className='inputSignUp' type='password' id='password' placeholder='Password'></input>
          <input className='inputSignUp' type='text' id='arn' placeholder='arn'></input>
          {/* Generate uuid for them */}
          {/* Bullet point text that tells them what to do with a link */}
          <button onClick={handleSubmit} className='SignupBtn' type='submit'>Sign Up</button>
        </div>
      </div>
    </form>
  )
}

export default SignUp;