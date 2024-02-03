import { createContext, useEffect, useContext, useReducer } from 'react'

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch(action.type){
    case "LOGIN":
      return { user: action.payload }
    case "LOGOUT":
      return { user: null }
    case "ADD_PROD": 
      return {...state, products: action.payload}

    default: return state
  }
}
 function AuthProvider({ children }) {
  const getCookie = () => {
    if(document.cookie){
      const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*$)|^.*$/, "$1");
      const decodedCookie = decodeURIComponent(cookieValue)
      const cleanedString = decodedCookie.replace(/^j:/, ''); // Remove 'j:' from the beginning
  
      const cookieObj = JSON.parse(cleanedString);
  
      return cookieObj
    }
  }

  const [state, dispatch] = useReducer(authReducer, {
    user:  getCookie(),
    products: null
  })

  const LOGIN = (payload) => {
    dispatch({type: "LOGIN", payload})
  }

  const LOGOUT = () => {
    dispatch({type: "LOGOUT"})
  }
  
  const ADD_PROD = (payload)  => {
    dispatch({type: "ADD_PROD", payload})
  }

  //TAKE THE USER STORED IN COOKIE
  return (
    <AuthContext.Provider value={{ ...state, LOGIN, LOGOUT, ADD_PROD }}>
        { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);
