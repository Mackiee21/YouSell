import { useUserContext } from "../../context/AuthContext"
import { Link, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import Loader from "../../utils/Loader";
import { useState } from 'react'
import axios from "axios";

function MobileNavBar({ showMobileMenu, setShowMobileMenu }) {
    const { user, LOGOUT } = useUserContext();
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] =useState(false);
  
    const handleLogout = async () => {
      try {
        setLoggingOut(true)
        const response = await axios.get("/api/logout")
        console.log(response)
        const { status } = response.data;
        if(status === "ok"){
          LOGOUT();
          navigate("/login")
        }
      } catch (error) {
        console.log(error)
      }finally{
        setLoggingOut(false)
      }
    }
  return (
    <div style={{right: showMobileMenu ? '0.5rem' : '-50%' }} className="fixed md:hidden text-zinc-800 h-[91.5%] top-12 transition-all duration-300 py-3 px-5 rounded-sm z-[20] bg-slate-50 overflow-y-auto">
        <ul>
            <li className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-full overflow-hidden relative border-2 border-teal-600 shadow-sm shadow-teal-600">
                    <img src="https://tse2.mm.bing.net/th?id=OIP.8JupcLPN_V7YSuIiPM58KwHaFK&pid=Api&P=0" className="object-center absolute top-0 left-0 object-cover w-full h-full" alt="user profile" />
                </div>
                <Link to="/profile" onClick={() => setShowMobileMenu(false)} className="cursor-pointer border-b border-slate-400 pb-1.5 text-teal-600">
                    <h1 className="font-bold capitalize">{user.name}</h1>
                    <p className="text-xs font-semibold lowercase">{user.username}</p>
                </Link>
            </li>
            <li onClick={handleLogout} className="flex items-center justify-between pe-2 text-sm">
                <div className="flex items-center gap-1.5">
                    <LogOut size={15} className="text-teal-600" />
                    <button className="font-medium">Logout</button>
                </div>
                {loggingOut && <Loader color={"rgb(13,148,136)"} />}
            </li>
        </ul>
    </div>
  )
}

export default MobileNavBar
