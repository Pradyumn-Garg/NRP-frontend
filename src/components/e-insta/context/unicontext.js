import React, { useState, useRef, useCallback, useEffect, createContext } from 'react';

export const UniContext = createContext();

export const UniProvider = ({ children }) => {
    const [unisvalue, setunisvalue] = useState([]);
    const [token, settoken] = useState("");
    const [email, setemail] = useState("");
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [curruni, setcurruni] = useState();
    const unidata = {
        token, settoken,
        unisvalue, setunisvalue,
        email, setemail,
        fname, setfname,
        lname, setlname,
        curruni, setcurruni
    };
    return <UniContext.Provider value={unidata}>{children}</UniContext.Provider>
}