import { createContext, useEffect, useContext, useReducer } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch(action.type){
    case "LOGIN":
      return { user: action.payload }
    case "LOGOUT":
      return { user: null }

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
    user:  getCookie()
  })

  const LOGIN = (payload) => {
    dispatch({type: "LOGIN", payload})
  }

  const LOGOUT = () => {
    dispatch({type: "LOGOUT"})
  }
  

  //TAKE THE USER STORED IN COOKIE
  return (
    <AuthContext.Provider value={{ ...state, LOGIN, LOGOUT }}>
        { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);
