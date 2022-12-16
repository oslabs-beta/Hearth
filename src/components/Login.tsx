import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useRef } from 'react';
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
} from '@mui/material';

const Login = (props) => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username: (document.getElementById('username') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value
    }
    const reqBody = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }


    const result = await fetch('http://localhost:3000/user/login', reqBody);
    const data = await result.json();
    
    if(data.arn) {
      props.handleRegionChange(data.region);
      props.handleArnChange(data.arn);
      props.handleExternalIdChange(data.externalId);
      navigate('/main');
    } else {
      alert('Incorrect username or password');
    }
  };

  return (
    <Box sx={{minHeight: '100%', display: 'flex', flexGrow: 1, alignItems: 'center'}}>
      <Container maxWidth="sm">
      <h1>Hearth</h1>
        <form className='loginForm' >
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              Sign in
            </Typography>
          </Box>
          <Box>
            <TextField className="inputLogin" label='username' type="text" id="username" onChange={props.handleUserChange} placeholder='username' fullWidth margin='normal' variant="outlined"></TextField>
            <TextField className="inputLogin" label='password' type="password" id="password" placeholder='password' fullWidth margin='normal' variant="outlined"></TextField>
            <Button onClick={handleSubmit} className="loginBtn" type="submit" variant='contained' fullWidth>Sign in</Button>
          </Box>
          <Box className='redirect'>
            <Typography variant="body2" className="redirectButton">Don't have an account? <Link id='link' to='/signup'>Sign Up</Link></Typography>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default Login;