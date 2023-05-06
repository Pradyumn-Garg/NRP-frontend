import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { UniContext } from '../context/unicontext';
import { Link } from "react-router-dom";
import apiMapping from '../../resources/apiMapping.json';
import axios from 'axios';
import Unidashboard from './unidashboard';
require('./unis.scss')


function getCurrentDate(separator = '/') {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    let minutes = (newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes();
    return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year} ${hours}${':'}${minutes}`
}


const Unis = () => {
    const [edit, setEdit] = React.useState(false);
    const [editid, setEditId] = useState('');
    const navigate = useNavigate();
    const {
        token, settoken,
        unisvalue, setunisvalue,
        email, setemail,
        fname, setfname,
        lname, setlname,
        curruni, setcurruni
    } = useContext(UniContext);

    const editname = (value, i) => {
        let newArr = [...unisvalue];
        newArr[i].uniname = value;
        newArr[i].updationinfo = getCurrentDate();
        setunisvalue(newArr)
    }

    const deleteuni = (i) => {
        axios.delete(apiMapping.userData.deleteuni + unisvalue[i]._id).then(response => {
        });
        setunisvalue([
            ...unisvalue.slice(0, i),
            ...unisvalue.slice(i + 1, unisvalue.length)
        ]);
    }

    const postunisdb = (uniname, creationinfo, updationinfo, payload, newunis) => {
        let payload2 =
        {
            "payload": payload,
            "email": email,
            "uniname": uniname,
            "creationinfo": creationinfo,
            "updationinfo": updationinfo
        }
        axios.post(apiMapping.userData.postunis, payload2).then(response => {
            let temp = [...newunis];
            temp[newunis.length - 1]._id = response.data._id;
            setunisvalue(temp);
        })
    }

    const putunisdb = (i) => {
        let newArr = [...unisvalue];
        let payload2 =
        {
            "payload": newArr[i].payload,
            "updationinfo": newArr[i].updationinfo,
            "uniname": newArr[i].uniname
        }
        axios.put(apiMapping.userData.putunis + newArr[i]._id, payload2).then(response => {
        })
    }

    return (
        <>
            <div>
                <Button
                    type="submit"
                    variant="contained"
                    className='btn'
                    onClick={(e) => {
                        e.preventDefault();
                        let newuni = {
                            _id: "",
                            payload: "",
                            email: "",
                            uniname: "New University",
                            creationinfo: getCurrentDate(),
                            updationinfo: getCurrentDate()
                        }
                        postunisdb(newuni.uniname, newuni.creationinfo, newuni.updationinfo, newuni.payload, [...unisvalue, newuni]);
                    }}
                >
                + add university
                </Button>
                <div className='a'>
                    {
                        unisvalue.map((curruni, i) => (
                            <>
                                <Button
                                    disableRipple
                                    className='btn1'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setcurruni(i);
                                        navigate('/unidashboard');
                                    }}
                                >
                                    <div className='b'>
                                        {
                                            edit == true && editid == i ? (
                                                <div className='c'>
                                                    <Button
                                                        disableRipple
                                                        className='btn2'
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                        }}
                                                    >
                                                        <TextField className="text1" size='small'  value={curruni.uniname} variant="standard"
                                                            InputProps={{ disableUnderline: true }}
                                                            onChange={(e) => { editname(e.target.value, i) }}
                                                        />
                                                    </Button>

                                                    <Button
                                                        className='btn3'
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            putunisdb(i);
                                                            setEdit(false);
                                                        }}
                                                        startIcon={<DoneIcon style={{ color: "rgb(243, 243, 243)", marginRight: "-13px" }} />}
                                                    />
                                                </div>
                                            ) :
                                                (
                                                    <div className='d'>
                                                        {curruni.uniname}
                                                    </div>
                                                )

                                        }
                                        <div className='e'>
                                            created at: {curruni.creationinfo}
                                            <br />
                                            updated at: {curruni.updationinfo}
                                        </div>
                                    </div>
                                    <div className='f'>
                                        <Button
                                            className='btn4'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                setEdit(true)
                                                setEditId(i)
                                            }}
                                            startIcon={<EditOutlinedIcon className='icon' />}
                                        />

                                        <Button
                                            className='btn5'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                deleteuni(i);
                                            }}
                                            startIcon={<DeleteOutlineOutlinedIcon className='icon' />}
                                        />
                                    </div>
                                </Button>
                                <br />
                                <br />
                            </>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default Unis