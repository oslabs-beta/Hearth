import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

interface Props {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  handleUserChange : React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
  handleRegionChange: (event: Event) => void;
  externalId: string;
  setExternalId : React.Dispatch<React.SetStateAction<string>>;
  handleExternalIdChange: (event: Event) => void;
  arn : string;
  setArn: React.Dispatch<React.SetStateAction<string>>;
  handleArnChange: (event: Event) => void;
}

const Login = (props: Props) => {

  const navigate = useNavigate();
  // post username and password and chcek if they are valid, in which case redirect to the home page
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


    const result = await fetch('https://hearth-373718.wl.r.appspot.com/user/login', reqBody);
    const data = await result.json();
    //if there is an arn in the returned data, that means the login was successful
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