import React, { useState, useRef, useCallback, useEffect } from 'react';
import './index.css';
import { render } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import Login from './components/nrp/login/login'
import Signup from './components/nrp/login/signup'
import Home from './components/nrp/main/home'
import Switch from "react-switch";
import Unidashboard from './components/nrp/main/unidashboard';
import Unis from './components/nrp/main/unis';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/unidashboard" element={<Unidashboard />}></Route>
      <Route path="/unilist" element={<Unis />} ></Route>
    </Routes>
  );
}

export default App;

// export default function App() {
//   return (
//           <Routes>
//             <Route path="/" element={<Login />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/reactapp" element={<Reactuni />} />
//             <Route path="/unilist" element={<Unis />} />
//           </Routes>
//   );
// }