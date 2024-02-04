import { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch(action.type){
    case "LOGIN":
      return {...state, user: action.payload }
    case "LOGOUT":
      return {...state, user: null }
    case "ADD_PROD": 
      return {...state, products: action.payload}
    case "ADD_TO_CART":
      return { ...state, cart: [...state?.cart, action.payload]}

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
    products: null,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
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

  const ADD_TO_CART = (payload) => {
    dispatch({type: "ADD_TO_CART", payload})
  }

  console.log("Auth", state);
  //TAKE THE USER STORED IN COOKIE
  return (
    <AuthContext.Provider value={{ ...state, LOGIN, LOGOUT, ADD_PROD, ADD_TO_CART }}>
        { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);
