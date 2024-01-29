import { createContext, useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { isUserAuthenticated } from '../middlewares/userAuth';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const isAuthenticated = isUserAuthenticated();
   const [user, setUser] = useState(isAuthenticated ? "mark": null);
  return (
    <AuthContext.Provider value={{ user }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);
