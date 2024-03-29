import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link2 from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../../resources/logo.png';
import apiMapping from '../../resources/apiMapping.json';
import axios from 'axios';
import { Link } from "react-router-dom";
import { render } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { UniContext } from '../context/unicontext';
import './login.scss'

const theme = createTheme();

export default function Login() {

  const [textboxemail, settextboxemail] = useState('');
  const [textboxpass, settextboxpass] = useState('');
  const [errorflag, seterrorflag] = useState(false);
  const navigate = useNavigate();
  const {
    token, settoken,
    unisvalue, setunisvalue,
    email, setemail,
    fname, setfname,
    lname, setlname
  } = useContext(UniContext);


  const errorbox = () => {
    if (errorflag) {
      return (
        <Box noValidate className='dummy'>
          <div className='dummy1' >
            Error: Incorrect "Email" or "Password"
          </div>
        </Box>
      )
    }
  }

  const getunisdb = (recievedemail) => {
    let payload =
    {
      "email": recievedemail
    }
    axios.post(apiMapping.userData.getunis, payload).then(response => {
      setunisvalue(response.data);
    })
  }

  const signin = () => {
    let payload =
    {
      "email": textboxemail,
      "password": textboxpass
    }
    axios.post(apiMapping.userData.postlogin, payload).then(response => {
      seterrorflag(false);
      if (response.data.email == undefined) {
        seterrorflag(true);
      }
      else {
        settoken(response.data.token);
        setfname(response.data.firstname);
        setlname(response.data.lastname);
        setemail(response.data.email);
        getunisdb(response.data.email)
        // console.log("response:", response);
        navigate('/home');
      }
    })
      .catch((error) => {
        if (error.code == "ERR_BAD_RESPONSE") {
          seterrorflag(true);
        }
        // console.log("the error: ", error)
      })
  }

  return (
    <div className='dummy4'>
      <AppBar position="static" className='dummy5' style={{ background: '#54B55D', height: "45px" }}>
        <Container className='cont' maxWidth="xl">
          <Toolbar disableGutters>
            <img src={logo} alt="My logo" width="70" height="33" style={{ marginTop: "-15px", marginLeft: "-15px" }} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: '10vw', hright: '10vh' }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            </Typography>

            <Button color="inherit" className='buttons1'  sx={{ fontSize: "11px", marginTop: "-15px", marginRight: "-10px" }} onClick={(e) => { navigate('/') }}>LOGIN</Button>
            <Button color="inherit" className='buttons1'  sx={{ fontSize: "11px", marginTop: "-15px", marginRight: "-10px" }} onClick={(e) => { navigate('/signup') }}>SIGN UP</Button>

          </Toolbar>
        </Container>
      </AppBar>
      <ThemeProvider theme={theme} className="theme">
        <Container component="main" className='contain'>
          <CssBaseline />
          <Box
            className='box1'
          >

            <Typography component="h1" variant="h5" className='typo' >
              NIRF Rank Predictor
            </Typography>
            <Box component="form" noValidate className='boxes'>
              {errorbox()}
              <TextField
                margin="normal"
                fullWidth
                size='small'
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                InputLabelProps={{
                  style: { color: '#000000' },
                }}
                className='texts'
                inputProps={{ style: { fontFamily: 'nunito', color: 'black' , backgroundColor: '#F4E798'} }}
                onChange={(e) => { settextboxemail(e.target.value) }}
              />
              <TextField
                margin="normal"
                fullWidth
                size='small'
                name="password"
                label="Password"
                type="password"
                id="password"
                InputLabelProps={{
                  style: { color: '#000000' },
                }}
                inputProps={{ style: { fontFamily: 'nunito', color: 'black' , backgroundColor: '#F4E798'} }}
                className='texts'
                autoComplete="current-password"
                onChange={(e) => { settextboxpass(e.target.value) }}
              />

              <Typography component="h1" variant="h5" fontFamily='monospace' color='#f8f8f2' sx={{ fontWeight: 550, marginLeft: "-60%" }}>
              </Typography>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className='buttons'
                onClick={(e) => {
                  e.preventDefault();
                  signin();
                }}
              >
                Login
              </Button>

              <Grid container>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                  <Link2 href="/signup" variant="body2" className='links'>
                    No account yet → <span style={{ fontWeight: 'bold' }}>Sign up</span>
                  </Link2>
                </Grid>
                <Grid item xs={12}>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}