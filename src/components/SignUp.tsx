import * as React from 'react';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const navigate = useNavigate();
  const externalId = uuidv4();
  let region = 'us-west-1';

  const handleRegionChange = (e) => {
    e.preventDefault();
    region = e.target.value;
  }

  const handleAWSLink = (e) => {
    e.preventDefault();
    console.log(`https://${region}.console.aws.amazon.com/cloudformation/home?region=us-west-1#/stacks/create/review?templateURL=https://s3-us-west-1.amazonaws.com/cf-templates-29uosuh8qcp6-us-west-1/202234320s-HearthDelegationRolexy3errkxv8q&stackName=Hearth-Stack&param_ExternalId=${externalId}`);
    window.open(`https://${region}.console.aws.amazon.com/cloudformation/home?region=us-west-1#/stacks/create/review?templateURL=https://s3-us-west-1.amazonaws.com/cf-templates-29uosuh8qcp6-us-west-1/202234320s-HearthDelegationRolexy3errkxv8q&stackName=Hearth-Stack&param_ExternalId=${externalId}`);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username: (document.getElementById('username') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
      arn: (document.getElementById('arn') as HTMLInputElement).value,
      region: region,
      externalId: externalId
    }
    //add logic to see if everything is a valid username and password
    // alphanumeric regex /^[a-z0-9]+$/i
    if (userData.username.match(/^[a-z0-9]+$/i) && userData.password.length > 5) {

      const reqBody = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      }
      const result = await fetch('http://localhost:3000/user/signup', reqBody);
      const data = await result.json();
      if(data === 'Signup Successful!') {
      alert('Signup successful!');
      navigate('/');
      } else if (data.message.log.includes('Username already exists')) {
        alert('Username already exists.');
      } else {
        alert('Signup unsuccessful.');
      }
    } else {
      alert('Username must be alphanumeric and Password must be at least 6 characters long');
    }
  }

  return (
    <form className='signUpForm' >
      <div className='box' >
        <h1>Hearth</h1>
        <div className='inputs' >
          <input className='inputSignUp' type='text' id='username' placeholder='Username'></input>
          <input className='inputSignUp' type='password' id='password' placeholder='Password'></input>
          <label>Region:</label>
          <select name="regions" onChange={handleRegionChange}>
            <option>us-west-1</option>
            <option>us-west-2</option>
            <option>us-east-1</option>
            <option>us-east-2</option>
            <option>ap-south-1</option>
            <option>ap-southeast-1</option>
            <option>ap-southeast-2</option>
            <option>ap-northeast-1</option>
            <option>ap-northeast-2</option>
            <option>ap-northeast-3</option>
            <option>ca-central-1</option>
            <option>eu-central-1</option>
            <option>eu-west-1</option>
            <option>eu-west-2</option>
            <option>eu-west-3</option>
            <option>eu-north-1</option>
            <option>sa-east-1</option>
          </select>
          <button id='awsBtn' onClick={handleAWSLink}>Add AWS Stack with Hearth</button>
          <input className='inputSignUp' type='text' id='arn' placeholder='ARN'></input>
          <ul>
            <li>Select your AWS region then click the “Add AWS Stack with Hearth” button</li>
            <li>You will be redirected to your AWS IAM page. Log in; you will be prompted to create a Hearth-Stack</li>
            <li>Navigate to the 'Outputs' tab; copy the Hearth-Stack ARN</li>
            <li>Paste it in the ARN box</li>
            <li>Click 'Sign Up'</li>
          </ul>
          <button onClick={handleSubmit} className='SignupBtn' type='submit'>Sign Up</button>
          <br />
          <span className="redirectButton">Already have an account? <Link id='link' to='/'>Log in here</Link></span>
        </div>
      </div>
    </form>
  )
}

export default SignUp;