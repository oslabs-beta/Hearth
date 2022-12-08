import * as React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      firstname: (document.getElementById('firstname') as HTMLInputElement).value,
      lastname: (document.getElementById('lastname') as HTMLInputElement).value,
      username: (document.getElementById('username') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value
    }

    const reqBody = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }
    const result = await fetch('api/user/signup', reqBody);
    const data = await result.json();
    //add logic to see if everything is a valid username and password
    navigate('/main');
  }

  return (
    <form className='signUpForm' >
      <div className='box' >
        <h1>Hearth</h1>
        <div className='inputs' >
          <input className='inputSignUp' type='text' id='firstname' placeholder='firstname'></input>
          <input className='inputSignUp' type='text' id='lastname' placeholder='lastname'></input>
          <input className='inputSignUp' type='text' id='username' onChange={props.handleUserChange} placeholder='username'></input>
          <input className='inputSignUp' type='password' id='password' placeholder='password'></input>
          <button onClick={handleSubmit} className='SignupBtn' type='submit'>Sign Up</button>
        </div>
      </div>
    </form>
  )
}