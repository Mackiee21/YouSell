import axios from 'axios';
import { createContext, useEffect, useContext, useReducer } from 'react'

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
      const response = await axios.get('/api/auth/status');
      if(response.data?.user){
        dispatch({type: "LOGIN", payload: response.data.user})
      }
    } catch (error) {
      console.log(error)
    }
}

  return (
    <AuthContext.Provider value={{ ...state, dispatch, checkStatus }}>
        { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);
