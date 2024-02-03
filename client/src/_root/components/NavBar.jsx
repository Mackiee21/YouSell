import axios from "axios"
import { useEffect, forwardRef } from "react"
import { useState, useRef } from "react"
import { ShoppingCartIcon, SearchIcon, ChevronDownIcon, ChevronUp } from 'lucide-react'
import { Link } from "react-router-dom"
import NavDropDown from "./NavDropDown"


function NavBar() {
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
    <div className="sticky uppercase font-sans font-medium top-0 py-2.5 px-16 bg-teal-600 text-white flex items-center justify-between z-[1000]">
      <Link to="/"><h1 className="logo text-xl tracking-widest font-bold text-white">YouSell</h1></Link>
      <form className="grow max-w-sm flex items-center gap-3 bg-slate-200  rounded pe-3 hover:bg-slate-300 transition-all duration-150">
        <input type="search" className="text-black font-normal bg-slate-200 grow focus:ring-2 focus:ring-blue-500 py-1.5 rounded-l border-none placeholder:text-gray-600 placeholder:font-normal" placeholder="Search" />
        <SearchIcon size={20} color={"black"} className="cursor-pointer" />
      </form>

      <div ref={navRef} className="flex items-center gap-7 select-none">
          <div onClick={() => alert("cart to be shown")} className="flex items-center gap-1.5 text-xs cursor-pointer">
              <ShoppingCartIcon size={18} />
            <p>My Cart</p>
          </div>
          <div className="flex items-center gap-1 relative">
            <div title="Go on" onClick={() => setShowDrop(!showDrop)} className="cursor-pointer hover:bg-white hover:text-teal-600 transition-all duration-200 rounded-full p-0.5">
              <ChevronDownIcon size={20} />
            </div>
            <p className="text-xs">Account </p>
            {showDrop && 
            <div className="absolute top-[100%] mt-5 right-0">
                <NavDropDown setShowDrop={setShowDrop} /> 
            </div>}
          </div>
      </div>
    </div>
  )
}

export default forwardRef(NavBar)
