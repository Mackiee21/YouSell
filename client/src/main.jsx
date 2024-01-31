import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
const el = document.getElementById("root");
import AuthProvider from './context/AuthContext'

const root = ReactDOM.createRoot(el);

axios.interceptors.response.use((response) => response, (error) => {
  if(error.response && error.response.status === 401){
    alert(error.response.data.message)
    window.location.href = "/login"
  }
  else if(error.response.status === 500){
    alert("Internal Server error, Try again")
  }
  return Promise.reject(error) //this one's working mak ha
})
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);