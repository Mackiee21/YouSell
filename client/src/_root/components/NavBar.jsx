import axios from "axios"
import { useEffect } from "react"
import { useState, useRef } from "react"
import { PlusIcon } from 'lucide-react'
import { Link } from "react-router-dom"
import { useUserContext } from "../../context/AuthContext"
import NavDropDown from "./NavDropDown"


function NavBar() {
  const { user }  = useUserContext();
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
            <div className="absolute top-[100%] mt-3.5 -left-[100%]">
                <NavDropDown setShowDrop={setShowDrop} /> 
            </div>}
          </div>
      </div>
    </div>
  )
}

export default NavBar
