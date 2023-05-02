import React, { useState, useRef, useCallback, useEffect } from 'react';
import './index.css';
import { render } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import Login from './components/e-insta/login/login'
import Signup from './components/e-insta/login/signup'
import Home from './components/e-insta/main/home'
import Switch from "react-switch";
// import Reactuni from './components/e-insta/main/reactuni';
import Unis from './components/e-insta/main/unis';
import { UniProvider } from './components/e-insta/context/unicontext';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/home" element={<Home />}></Route>
      {/* <Route path="/reactapp" element={<Reactuni />}></Route> */}
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
