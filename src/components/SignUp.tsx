import * as React from 'react';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NextLink from 'next/link';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Select,
  TextField,
  Typography, 
  MenuItem,
  List,
  ListItem
} from '@mui/material';

const SignUp = (props) => {
  const navigate = useNavigate();
  const externalId = uuidv4();
  const [region, setRegion] = useState('us-west-1');

  const handleRegionChange = (e) => {
    e.preventDefault();
    setRegion(e.target.value);
    // console.log(region);
  }

  const handleAWSLink = (e) => {
    e.preventDefault();
    window.open(`https://${region}.console.aws.amazon.com/cloudformation/home?region=us-west-1#/stacks/create/review?templateURL=https://s3-us-west-1.amazonaws.com/cf-templates-29uosuh8qcp6-us-west-1/20223483f9-Hearth-Stack-212mrtryugdaf&stackName=Hearth-Stack&param_ExternalId=${externalId}`);
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
      console.log(userData);
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
    <Box sx={{minHeight: '100%', display: 'flex', flexGrow: 1, alignItems: 'center'}}>
      <Container maxWidth="sm">
      <h1>Hearth</h1>
        <form className='signUpForm' >
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              Create a new account
            </Typography>
          </Box>
            <TextField className='inputSignUp' label='username' type='text' id='username' placeholder='Username' fullWidth margin="normal" variant="outlined"/>
            <TextField className='inputSignUp' label='password' type='password' id='password' placeholder='Password' fullWidth margin='normal' variant="outlined"/>
            <FormControl sx={{minWidth: 120, mt: 2}} fullWidth>
              <InputLabel id="demo-simple-select-label">Region</InputLabel>
              <Select label="Region" value={region} onChange={handleRegionChange}>
                <MenuItem value={'us-west-1'}>us-west-1</MenuItem>
                <MenuItem value={'us-west-2'}>us-west-2</MenuItem>
                <MenuItem value={'us-east-1'}>us-east-1</MenuItem>
                <MenuItem value={'us-east-2'}>us-east-2</MenuItem>
                <MenuItem value={'ap-south-1'}>ap-south-1</MenuItem>
                <MenuItem value={'ap-southeast-1'}>ap-southeast-1</MenuItem>
                <MenuItem value={'ap-southeast-2'}>ap-southeast-2</MenuItem>
                <MenuItem value={'ap-northeast-1'}>ap-northeast-1</MenuItem>
                <MenuItem value={'ap-northeast-2'}>ap-northeast-2</MenuItem>
                <MenuItem value={'ap-northeast-3'}>ap-northeast-3</MenuItem>
                <MenuItem value={'ca-central-1'}>ca-central-1</MenuItem>
                <MenuItem value={'eu-central-1'}>eu-central-1</MenuItem>
                <MenuItem value={'eu-west-1'}>eu-west-1</MenuItem>
                <MenuItem value={'eu-west-2'}>eu-west-2</MenuItem>
                <MenuItem value={'eu-west-3'}>eu-west-3</MenuItem>
                <MenuItem value={'eu-north-1'}>eu-north-1</MenuItem>
                <MenuItem value={'sa-east-1'}>sa-east-1</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ mt: 2 }}>
            <Button color="primary" id='awsBtn' onClick={handleAWSLink} variant="outlined">Add AWS Stack with Hearth</Button>
            <List>
              <Typography variant='body2'>Select your AWS region then click the “Add AWS Stack with Hearth” button</Typography>
              <Typography variant='body2'>You will be redirected to your AWS IAM page. Sign in and create a Hearth-Stack</Typography>
              <Typography variant='body2'>Navigate to the "Outputs" tab and copy the Hearth-Stack ARN</Typography>
              <Typography variant='body2'>Paste it in the ARN box</Typography>
            </List>
            </Box>
            <TextField className='inputSignUp' type='text' id='arn' placeholder='ARN' label='ARN' fullWidth margin='normal' variant="outlined"/>
            <Button color='primary' onClick={handleSubmit} className='SignupBtn' type='submit' variant='contained' fullWidth>Sign Up</Button>
            <br />
            <Typography className="redirectButton">Have an account? <Link id='link' to='/'>Sign in</Link></Typography>
        </form>
      </Container>
    </Box>
  )
}

export default SignUp;