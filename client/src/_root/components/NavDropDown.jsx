import { useUserContext } from "../../context/AuthContext"
import { Link, useNavigate } from 'react-router-dom'
import { PlusIcon, LogOut, PlusSquare } from 'lucide-react'
import { useState } from "react";
import Loader from "../../utils/Loader"
import axios from "axios";


function NavDropDown({ setShowDrop }) {
  const { LOGOUT } = useUserContext();
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
    const { user } = useUserContext();
  return (
    <div className="relative font-main capitalize border-[1.5px] bg-white text-zinc-700 py-5 px-6 rounded whitespace-nowrap">
      <div className="absolute right-14 w-6 h-6 rounded-sm bg-zinc-600 rotate-45 -top-2 -z-[5]"></div>
      <ul className="flex flex-col gap-3 tracking-wide">
        <li className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden relative border-2 border-zinc-400">
                <img src="https://tse2.mm.bing.net/th?id=OIP.8JupcLPN_V7YSuIiPM58KwHaFK&pid=Api&P=0" className="object-center absolute top-0 left-0 object-cover w-full h-full" alt="user profile" />
            </div>
            <Link to="/profile" onClick={() => setShowDrop(false) } className="cursor-pointer border-b border-slate-400 pb-1.5">
                <h1 className="font-semibold ">{user.name}</h1>
                <p className="text-xs font-medium lowercase">{user.username}</p>
            </Link>
        </li>
        <li className="text-sm flex items-center gap-1 mt-2">
            <PlusIcon size={18} />
            <p>Add Product</p>
        </li>
        <li className="text-sm">
          <button disabled={loggingOut} className="w-full flex items-center justify-between rounded hover:bg-slate-200 transition-all duration-150 text-sm py-2 ps-1 pe-2" onClick={handleLogout}>
              <div className="flex items-center gap-1.5">
                <LogOut size={15} />
                <p>Logout</p>
              </div>
              {loggingOut && <Loader color={'black'} />}
            </button>
          </li>
      </ul>
    </div>
  )
}

export default NavDropDown
