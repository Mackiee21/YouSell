import axios from "axios"
import { useEffect } from "react"
import { useState, useRef } from "react"
import { PlusIcon } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom"
import { useUserContext } from "../../context/AuthContext"
import Loader from "../../utils/Loader"
import NavDropDown from "./NavDropDown"


function NavBar() {
  const { user, LOGOUT }  = useUserContext();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [showDrop, setShowDrop] = useState(false);
  const navRef = useRef(null);

  //get user info like image and whatnot
  useEffect(() => {
    const checkIsChild = (e) => {
     if(navRef.current){
      if(!navRef.current.contains(e.target)) setShowDrop(false)
     }
    }
    if(navRef.current){
      document.addEventListener("click", checkIsChild)
    }
    return () => {
      document.removeEventListener("click", checkIsChild)
    }

  }, [])

  const handleLogout = async () => {
    //make a get request to the logout endpoint
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
    <div className="sticky top-0 py-2.5 px-16 bg-teal-600 text-white flex items-center justify-between z-[1000]">
      <Link to="/"><h1 className="logo text-xl tracking-widest font-bold text-white">YouSell</h1></Link>
      <div ref={navRef} className="flex items-center gap-5 select-none">
          <div className="flex items-center gap-2 relative">
            <div onClick={() => setShowDrop(!showDrop)} className="cursor-pointer hover:bg-white hover:text-teal-600 transition-all duration-200 rounded-full p-0.5">
              <PlusIcon size={20} />
            </div>
            <p className="font-medium">Hi, {user.name} </p>
            {showDrop && 
            <div className="absolute top-[100%] mt-4 -left-[50%]">
                <NavDropDown setShowDrop={setShowDrop} /> 
            </div>}
          </div>
          <button disabled={loggingOut} className="border flex items-center justify-center gap-1.5 rounded hover:opacity-85 text-sm font-bold bg-teal-600 py-1.5 px-5" onClick={handleLogout}>
            <p>Logout</p>
            {loggingOut && <Loader />}
          </button>
      </div>
    </div>
  )
}

export default NavBar
