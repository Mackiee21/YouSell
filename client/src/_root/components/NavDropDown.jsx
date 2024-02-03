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
    <div className="font-main capitalize border-[1.5px] border-teal-600 bg-teal-600 p-4 rounded whitespace-nowrap">
      <ul className="flex flex-col gap-3 tracking-wide text-white">
        <li className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden relative border-2 border-slate-200">
                <img src="https://tse2.mm.bing.net/th?id=OIP.8JupcLPN_V7YSuIiPM58KwHaFK&pid=Api&P=0" className="object-center absolute top-0 left-0 object-cover w-full h-full" alt="user profile" />
            </div>
            <Link to="/profile" onClick={() => setShowDrop(false) } className="cursor-pointer border-b border-slate-400 pb-1.5">
                <h1 className="font-medium ">{user.name}</h1>
                <p className="text-xs font-normal lowercase">{user.username}</p>
            </Link>
        </li>
        <li className="text-sm font-normal flex items-center gap-1 mt-2">
            <PlusIcon size={18} />
            <p>Add Product</p>
        </li>
        <li className="text-sm font-normal">
          <button disabled={loggingOut} className="flex items-center justify-center gap-1.5 rounded hover:opacity-85 text-sm pt-2" onClick={handleLogout}>
              <LogOut size={15} />
              <p>Logout</p>
              {loggingOut && <Loader />}
            </button>
          </li>
      </ul>
    </div>
  )
}

export default NavDropDown
