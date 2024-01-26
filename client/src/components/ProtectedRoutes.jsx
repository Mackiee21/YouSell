import { useEffect } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { isUserAuthenticated } from '../middlewares/userAuth'

let interval;
const userStillActive = () => {
    localStorage.setItem("expiryDate", Date.now() + (1000 * 60));
}
const  checkAuthorization = () => {
    const storedDate = localStorage.getItem("expiryDate");
    if(storedDate < Date.now()){
       clearInterval(interval)
       return true;
    }
    return false;
}

function ProtectedRoutes({ setSesExpired }) {
    const location = useLocation();

    const isAuthenticated = isUserAuthenticated();
    if(isAuthenticated){
        userStillActive();
    }
   useEffect(() => {
    window.addEventListener("mousemove", userStillActive)
    window.addEventListener("keypress", userStillActive)
    window.addEventListener("click", userStillActive)
        if(isAuthenticated){
            interval = setInterval(() => {
                const expired = checkAuthorization();
                console.log("calling")
                if(expired) window.location.reload();
            }, 1000);
        }
        setSesExpired(!isAuthenticated)
        return () => {
            interval ? clearInterval(interval) : null;
            window.removeEventListener('mousemove', userStillActive)
            window.removeEventListener('keypress', userStillActive)
            window.removeEventListener('click', userStillActive)
        }
   }, [location.pathname])
  return(
    isAuthenticated ? 
    <div>
        <Link to='/profile'>Profile</Link>
        <div>
            <Outlet />
        </div>
    </div>
    : <Navigate to='/login' />
  ) 
}

export default ProtectedRoutes
