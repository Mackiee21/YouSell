import { createContext, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { isUserAuthenticated } from '../middlewares/userAuth';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {
        const isAuthenticated = isUserAuthenticated();
        if(!isAuthenticated){
            navigate(pathname === "/" ? "/login" : pathname)
        }
    }, [])
  return (
    <AuthContext.Provider value={{}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
export const useUsrContext = () => useContext(AuthContext);
