import axios from 'axios';
import { useState } from 'react';
import { createContext, useEffect, useContext, useReducer } from 'react'
import AuthLayout from '../_auth/AuthLayout';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch(action.type){
    case "LOGIN":
      console.log("dispatched")
      return { user: action.payload }
    case "LOGOUT":
      return { user: null }

    default: return state
  }
}
 function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: document.cookie ? document.cookie.split("=")[0] : null
  })

async function checkStatus(){
    try {
      document.title = "Checking Authorization..."
      const response = await axios.get('/api/auth/status');
      if(response.data?.user){
        setIsAuth(true)
        setContent(true);
      document.title = "YouSell - Sell and Earn"
      }else{
        document.title = "YouSell - Login"
      }
    } catch (error) {
      console.log(error)
    }

}

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
        { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);
