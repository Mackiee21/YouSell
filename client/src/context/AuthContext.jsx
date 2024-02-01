import { createContext, useEffect, useContext, useReducer } from 'react'
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(authReducer, {
    user:  null
  })

  const LOGIN = (payload) => {
    dispatch({type: "LOGIN", payload})
  }

  const LOGOUT = () => {
    dispatch({type: "LOGOUT"})
  }
  console.log("Rendered?", state.user)
  
  useEffect(() => {
    const getCookie = () => {
      if(document.cookie){
        const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*$)|^.*$/, "$1");
        const decodedCookie = decodeURIComponent(cookieValue)
        const cleanedString = decodedCookie.replace(/^j:/, ''); // Remove 'j:' from the beginning
    
        const cookieObj = JSON.parse(cleanedString);
    
        return cookieObj
      }
    }
    const userCookie = getCookie();
      if(!state.user && userCookie){
        LOGIN(userCookie)
        navigate("/")
      }
  }, [])

  //TAKE THE USER STORED IN COOKIE
  return (
    <AuthContext.Provider value={{ ...state, LOGIN, LOGOUT }}>
        { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);
