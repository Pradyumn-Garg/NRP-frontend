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
import './unidashboard.scss'


export default function Unidashboard() {

    const navigate = useNavigate();
    const [finalscore, setfinalscore] = useState(0);

    const [tlr, settlr] = useState(0);
    const [rp, setrp] = useState(0);
    const [go, setgo] = useState(0);
    const [oi, setoi] = useState(0);
    const [pcp, setpcp] = useState(0);


    const [ss, setss] = useState(0);
    const [fsr, setfsr] = useState(15);
    const [fqe, setfqe] = useState(13);
    const [fru, setfru] = useState(20);

    const [pu, setpu] = useState(23);
    const [qp, setqp] = useState(11);
    const [ipr, setipr] = useState(5);
    const [fppp, setfppp] = useState(4);


    const [gph, setgph] = useState(16);
    const [gue, setgue] = useState(8);
    const [gms, setgms] = useState(13);
    const [gphd, setgphd] = useState(9);


    const [rd, setrd] = useState(18);
    const [wd, setwd] = useState(13);
    const [escs, setescs] = useState(11);
    const [pcs, setpcs] = useState(6);

    const [nt, setnt] = useState(0);
    const [ne, setne] = useState(0);
    const [np, setnp] = useState(0);

    const [isHovering1, setIsHovering1] = useState(false);
    const [isHovering2, setIsHovering2] = useState(false);
    const [isHovering3, setIsHovering3] = useState(false);
    const [isHovering4, setIsHovering4] = useState(false);
    const [isHovering5, setIsHovering5] = useState(false);
    const [ssclicked, setssclicked] = useState(false);


    const handleMouseOver1 = () => {
        setIsHovering1(true);
    };
    const handleMouseOut1 = (i) => {
        setIsHovering1(false);
    };
    const handleMouseOver2 = () => {
        setIsHovering2(true);
    };
    const handleMouseOut2 = (i) => {
        setIsHovering2(false);
    };
    const handleMouseOver3 = () => {
        setIsHovering3(true);
    };
    const handleMouseOut3 = (i) => {
        setIsHovering3(false);
    };
    const handleMouseOver4 = () => {
        setIsHovering4(true);
    };
    const handleMouseOut4 = (i) => {
        setIsHovering4(false);
    };
    const handleMouseOver5 = () => {
        setIsHovering5(true);
    };
    const handleMouseOut5 = (i) => {
        setIsHovering5(false);
    };

    const {
        fname, lname
    } = useContext(UniContext);

    useEffect(() => {
        settlr(() => parseInt(ss) + parseInt(fsr) + parseInt(fqe) + parseInt(fru));
    }, [ss, fsr, fqe, fru]);

    useEffect(() => {
        setrp(() => parseInt(pu) + parseInt(qp) + parseInt(ipr) + parseInt(fppp));
    }, [pu, qp, ipr, fppp]);

    useEffect(() => {
        setgo(() => parseInt(gph) + (gue) + parseInt(gms) + parseInt(gphd));
    }, [gph, gue, gms, gphd]);

    useEffect(() => {
        setoi(() => parseInt(rd) + parseInt(wd) + parseInt(escs) + parseInt(pcs));
    }, [rd, wd, escs, pcs]);

    useEffect(() => {
        setss(() => 0.15*((-0.0116024925439712*nt)+(0.156288955703043*ne))+0.05*(np*0.0382977590127993));
    }, [nt, ne, np]);


    useEffect(() => {
        setfinalscore(() => (0.3 * tlr) + (0.3 * rp) + (0.2 * go) + (0.1 * oi) + (0.1 * pcp));
    }, [tlr, rp, go, oi, pcp]);

    const handledocbtnclick = () => {
        window.open('https://www.nirfindia.org/nirfpdfcdn/2022/framework/Engineering.pdf');
    };

    const handlepcpchange = (event) => {
        const value = event.target.value;
        setpcp(value);
    };

    const handlentchange = (event) => {
        const value = event.target.value;
        setnt(value);
    };
    const handlenechange = (event) => {
        const value = event.target.value;
        setne(value);
    };
    const handlenpchange = (event) => {
        const value = event.target.value;
        setnp(value);
    };

    return (
        <Box style={{ height: '100vh', minHeight: "100vh", paddingBottom: "35%" }}>
            <AppBar position="static" style={{ background: '#54B55D', height: "45px" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <img src={logo} alt="My logo" width="70" height="33" style={{ marginTop: "-15px", marginLeft: "-15px" }} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: '10vw', hright: '10vh' }} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        </Typography>
                        <Avatar sx={{ width: 34, height: 34 }} src={avatar} alt="user" className='ava' />
                        <div color="inherit" className='di'>
                            {`${fname}${" "}${lname}`}
                        </div>
                        <Button
                            color="inherit" className='but'
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/home');
                            }}
                        >BACK HOME</Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <div className='rank'>
                NIRF Score Estimate: {finalscore}
            </div>

            <div className='docrefer'>
                Refer to original documentation?
                <Button variant="contained" className='docbtn' color="primary" onClick={handledocbtnclick}>
                    Click Here
                </Button>
            </div>

            <Box className='pcpbox' style={{ backgroundColor: "#F4E798", minHeight: "14%", width: "28%", marginLeft: "20%", position: 'absolute' }}>
                <div className='boxheading2'>
                    Perception
                </div>
                <div
                    className='hover2'
                    onMouseOver={handleMouseOver5}
                    onMouseOut={handleMouseOut5}
                >
                    ?
                </div>
                {isHovering5 ? (
                    <div className='hoverbox5'>
                        Perception {'\n'}{'\n(Ranking weight: 0.10)'}
                    </div>
                ) : (console.log())}

                <TextField
                    id="default-textbox"
                    defaultValue={pcp}
                    variant="outlined"
                    inputProps={{ style: { fontFamily: 'nunito', color: 'black', backgroundColor: '#F9F9F9', height: "7px" } }}
                    className='pcptext'
                    onChange={handlepcpchange}
                />

            </Box>

            <Box className='box' style={{ backgroundColor: "#F4E798", minHeight: "47%", width: "28%", marginLeft: "20%", marginTop: "12%", position: 'relative', top: 0, left: 0 }}>
                <div className='boxheading'>
                    TLR
                    <div
                        className='hover'
                        onMouseOver={handleMouseOver1}
                        onMouseOut={handleMouseOut1}
                    >
                        ?
                    </div>
                </div>
                <div className='score'>
                    Score Estimate: {tlr}
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    className='btns'
                    onClick={(e) => {
                        e.preventDefault();
                        {ssclicked ? (setssclicked(false)) : (setssclicked(true))}
                    }}
                >
                    SS : {ss}{'/20'}
                </Button>

                {ssclicked ? (
                    <div className='sstextboxdiv'>
                        <TextField
                            id="default-textbox"
                            label="Total sanctioned approved"
                            defaultValue={nt}
                            variant="outlined"
                            inputProps={{ style: { fontFamily: 'nunito', color: 'black', backgroundColor: '#F9F9F9', height: "7px" } }}
                            className='sstextbox'
                            onChange={handlentchange}
                        />
                        <TextField
                            id="default-textbox"
                            label="Total students enrolled"
                            defaultValue={ne}
                            variant="outlined"
                            inputProps={{ style: { fontFamily: 'nunito', color: 'black', backgroundColor: '#F9F9F9', height: "7px" } }}
                            className='sstextbox'
                            onChange={handlenechange}
                        />
                        <TextField
                            id="default-textbox"
                            label="Total doctoral students prev year"
                            defaultValue={np}
                            variant="outlined"
                            inputProps={{ style: { fontFamily: 'nunito', color: 'black', backgroundColor: '#F9F9F9', height: "7px" } }}
                            className='sstextbox'
                            onChange={handlenpchange}
                        />
                    </div>
                ) : (console.log())}

                <Button
                    type="submit"
                    variant="contained"
                    className='btns'
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    FSR : {fsr}{'/30'}
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    className='btns'
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    FQE : {fqe}{'/20'}
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    className='btns'
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    FRU : {fru}{'/30'}
                </Button>

            </Box>
            {isHovering1 ? (
                <div className='hoverbox1'>
                    Teaching Learning and Resources {'\n'}{'\n(Ranking weight: 0.30)'}
                </div>
            ) : (console.log())}

            <Box className='box' style={{ backgroundColor: "#F4E798", minHeight: "47%", width: "28%", marginLeft: "50%", marginTop: "12%", position: 'relative',  top: -516, left: 20 }}>
                <div className='boxheading'>
                    RP
                    <div
                        className='hover'
                        onMouseOver={handleMouseOver2}
                        onMouseOut={handleMouseOut2}
                    >
                        ?
                    </div>
                </div>
                <div className='score'>
                    Score Estimate: {rp}
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    className='btns'
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    PU : {pu}{'/35'}
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    className='btns'
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    QP : {qp}{'/40'}
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    className='btns'
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    IPR : {ipr}{'/15'}
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    className='btns'
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    FPPP : {fppp}{'/10'}
                </Button>
            </Box>
            {isHovering2 ? (
                <div className='hoverbox2'>
                    Research and Professional Practice {'\n'}{'\n(Ranking weight: 0.30)'}
                </div>
            ) : (console.log())}


            <Box className='box' style={{ backgroundColor: "#F4E798", minHeight: "47%", width: "28%", marginLeft: "20%", marginTop: "42%", position: 'relative' ,top: -1030, left: 0 }}>
                <div className='boxheading'>
                    GO
                    <div
                        className='hover'
                        onMouseOver={handleMouseOver3}
                        onMouseOut={handleMouseOut3}
                    >
                        ?
                    </div>
                </div>
                <div className='score'>
                    Score Estimate: {go}
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    className='btns'
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    GPH : {gph}{'/40'}
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    className='btns'
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    GUE : {gue}{'/15'}
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    className='btns'
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    GMS : {gms}{'/25'}
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    className='btns'
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    GPHD : {gphd}{'/20'}
                </Button>
            </Box>
            {isHovering3 ? (
                <div className='hoverbox3'>
                    Graduation Outcomes {'\n'}{'\n(Ranking weight: 0.20)'}
                </div>
            ) : (console.log())}


            <Box className='box' style={{ backgroundColor: "#F4E798", minHeight: "47%", width: "28%", marginLeft: "50%", marginTop: "42%", position: 'relative', top: -1951, left: 20 }}>
                <div className='boxheading'>
                    OI
                    <div
                        className='hover'
                        onMouseOver={handleMouseOver4}
                        onMouseOut={handleMouseOut4}
                    >
                        ?
                    </div>
                </div>
                <div className='score'>
                    Score Estimate: {oi}
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    className='btns'
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    RD : {rd}{'/30'}
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    className='btns'
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    WD : {wd}{'/30'}
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    className='btns'
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    ESCS : {escs}{'/20'}
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    className='btns'
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    PCS : {pcs}{'/20'}
                </Button>
            </Box>
            {isHovering4 ? (
                <div className='hoverbox4'>
                    Outreach and Inclusivity {'\n'}{'\n(Ranking weight: 0.10)'}
                </div>
            ) : (console.log())}
        </Box>
    );
}
