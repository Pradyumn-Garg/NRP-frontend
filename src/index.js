import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from './App';
import Login from './components/nrp/login/login'
import Home from './components/nrp/main/home'
import Unis from './components/nrp/main/unis';
import reportWebVitals from './reportWebVitals';
import { UniContextProvider } from './components/nrp/context/unicontext';


const rootElement = document.getElementById("root");
render(
  <React.StrictMode>
    <BrowserRouter>
      <UniContextProvider>
        <App />
      </UniContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
