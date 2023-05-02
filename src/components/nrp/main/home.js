import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Unis from './unis';
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
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import logo from '../../resources/logo.png'
import { useNavigate } from "react-router-dom";
import { UniContext } from '../context/unicontext';
import avatar from '../../resources/userimg.jpg';
import apiMapping from '../../resources/apiMapping.json';
import { Link } from "react-router-dom";
import axios from 'axios';
import sx from '@mui/system/sx';
import './home.scss'
import { BrightnessHigh } from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      sx={{ fontColor: "black", width: "90px" }}
    >
      {value === index && (
        <Box sx={{ p: 3, color: 'rgba(0, 0, 0, 0.85)'}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function Home() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  const {
    token, settoken,
    email, setemail,
    fname, setfname,
    lname, setlname
  } = useContext(UniContext);


  const username = () => {
    return `${fname}${" "}${lname}`;
  }

  const [errorflag, seterrorflag] = useState(false);
  const [successflag, setsuccessflag] = useState(false);

  const errorbox = () => {
    if (errorflag) {
      return (
        <div style={{ marginLeft: "-70%", marginTop: "10px", position: "relative", backgroundColor: "#D32626", height: "35px", width: "30%", borderRadius: "6px"}}>
          <Typography
            sx={{
              mt: 1,
              fontFamily: 'sans-serif',
              fontWeight: 700,
              color: '#f8f8f2',
              fontSize: '12px',
              marginLeft: "11px"
            }}>
            Incorrect Old Password!
          </Typography>
        </div>
      )
    }
  }

  const successbox = () => {
    if (successflag) {
      return (
        <div style={{ marginLeft: "-70%", marginTop: "10px", position: "relative", backgroundColor: "#27b91a", height: "35px", width: "30%", borderRadius: "6px" }}>
          <Typography
            sx={{
              mt: 1,
              fontFamily: 'sans-serif',
              fontWeight: 700,
              color: '#f8f8f2',
              fontSize: '12px',
              marginLeft: "11px"
            }}>
            Password changed Successfully!
          </Typography>
        </div>
      )
    }
  }

  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [onclickdelete, setonclickdelete] = useState(false);
  const changepasswordfunc = () => {
    let payload =
    {
      "oldpassword": oldpassword,
      "newpassword": newpassword
    }
    axios.put(apiMapping.userData.changepassword + email, payload).then(response => {
      console.log("change pass response", response.data)
      if (response.data == "successful") {
        seterrorflag(false);
        setsuccessflag(true);
      }
      else if (response.data == "password incorrect") {
        setsuccessflag(false);
        seterrorflag(true);
      }
    })
  }
  const deleteuser = () => {
    axios.delete(apiMapping.userData.deleteallunis + email).then(response => {
    });
    axios.delete(apiMapping.userData.deleteuser + email).then(response => {
    });
  }

  return (
    <Box style={{ backgroundColor: "#F9F9F9", height: '100%', minHeight: "100vh" }}>
      <AppBar position="static" style={{ background: '#54B55D', height: "45px" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src={logo} alt="My logo" width="70" height="33" style={{ marginTop: "-15px", marginLeft: "-15px" }} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: '10vw', hright: '10vh' }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            </Typography>
            <Avatar sx={{ width: 34, height: 34 }} src={avatar} alt="user" className='ava'  />
            <div color="inherit" className='di'>
              {username()}
            </div>
            <Button
              color="inherit" className='but'
              onClick={(e) => {
                e.preventDefault();
                // navigate('/');
                window.location.href = '/';
              }}
            >LOGOUT</Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Box className='box4'>
        <Box className='box3'>
          <Tabs textColor="black" value={value} onChange={handleChange} aria-label="basic tabs example" TabIndicatorProps={{ style: { backgroundColor: "#54B55D"} }}>
            <Tab label="Universities" {...a11yProps(0)} className="tabs" />
            <Tab label="Account" {...a11yProps(1)} className="tabs" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} className="tablep" style={{ marginTop: "-1.5%" }}>
          <Unis />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            className='box2'
          >
            <Typography component="h1" variant="h5" color="black" className='typ' >
              Change Password
            </Typography>
            {errorbox()}
            {successbox()}
            <Box component="form" noValidate className='box1h'>
              &nbsp;Old Password*
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label=""
                type="password"
                id="oldpassword"
                autoComplete="current-password"
                size='small'
                InputLabelProps={{ style: { color: '#4A5568' } }}
                className='texts'
                inputProps={{ style: { fontFamily: 'nunito', color: 'black', backgroundColor: '#F4E798' } }}
                style={{ marginTop: "8px" }}
                onChange={(e) => { setoldpassword(e.target.value) }}
              />
              &nbsp;New Password*
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label=""
                type="password"
                id="newpassword"
                autoComplete="current-password"
                size='small'
                InputLabelProps={{ style: { color: '#4A5568' } }}
                className='texts'
                inputProps={{ style: { fontFamily: 'nunito', color: 'black', backgroundColor: '#F4E798' } }}
                style={{ marginTop: "8px" }}
                onChange={(e) => { setnewpassword(e.target.value) }}
              />
              &nbsp;
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className='buttonsh'
                onClick={(e) => {
                  e.preventDefault();
                  changepasswordfunc();
                }}
              >
                Change Password
              </Button>
            </Box>
          </Box>
          <br/>
          <hr/>
          <Box component="form" noValidate className='boxh'>
            Delete User
          </Box>
          <Box component="form" noValidate className='box2h'>
            *When you delete your user all connected data will be removed from our servers.
          </Box>

          {!onclickdelete ? (
          <div>
          <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{ textTransform: 'none', height: "40px", width: "160px", marginTop: "10px", marginLeft: "-1.5px" }}
          sx={{
            mt: 0, mb: 0, background: '#D32626', color: 'white', ':hover': {
              bgcolor: 'red',
              color: 'black',
            },
            fontWeight: 100,
            fontFamily: 'Polaris'
          }}
          onClick={(e) => {
            e.preventDefault();
            setonclickdelete(true);
          }}
          >
          Delete my user data
          </Button>
          </div>
          ) : (console.log())}

          <br></br>

          {onclickdelete ? (
            <div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ textTransform: 'none', height: "60px", width: "160px", marginTop: "-11px", marginLeft: "-1.5px" }}
                sx={{
                  mt: 0, mb: 0, background: '#54B55D', ':hover': {
                    bgcolor: '#54B55D',
                    color: 'black',
                  },
                  fontWeight: 100,
                  fontFamily: 'Polaris'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setonclickdelete(false);
                }}
              >
                Cancel deletion
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ textTransform: 'none', height: "60px", width: "160px", marginTop: "-10px", marginLeft: "1%" }}
                sx={{
                  mt: 0, mb: 0, background: '#D32626', ':hover': {
                    bgcolor: 'red',
                    color: 'black',
                  },
                  fontWeight: 100,
                  fontFamily: 'Polaris'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  deleteuser();
                  window.location.href = '/';
                }}
              >
                Confirm user and all data deletion?
              </Button>
            </div>
          ) : (console.log())}
        </TabPanel>

      </Box>
    </Box>
  );
}