import axios from "axios"
import { useEffect, forwardRef } from "react"
import { useState, useRef } from "react"
import { ShoppingCartIcon, SearchIcon, ChevronDownIcon, UserCircle2Icon } from 'lucide-react'
import { Link } from "react-router-dom"
import NavDropDown from "./NavDropDown"
import { useUserContext } from "../../context/AuthContext"
import { soldFormatter } from '../../utils/SoldFormatter'


function NavBar() {
  const [showDrop, setShowDrop] = useState(false);
  const navRef = useRef(null);
  const { cart } = useUserContext();

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
    <div className="sticky uppercase  font-medium top-0 py-2.5 px-5 md:px-16 bg-teal-600 text-white flex items-center justify-between z-[1000]">
      <Link to="/"><h1 className="logo text-xl tracking-widest font-bold text-white">YouSell</h1></Link>
      <form className="hidden  grow max-w-sm md:flex items-center gap-3 bg-slate-200  rounded pe-3 hover:bg-slate-300 transition-all duration-150">
        <input type="search" className="text-black font-normal bg-slate-200 grow focus:ring-2 focus:ring-blue-500 py-1.5 rounded-l border-none placeholder:text-gray-600 placeholder:font-normal" placeholder="Search" />
        <SearchIcon size={20} color={"black"} className="cursor-pointer" />
      </form>

      <div ref={navRef} className="font-medium flex items-center gap-2.5 md:gap-5 select-none">
          <div onClick={() => alert("cart to be shown")} className="relative flex items-center gap-1.5 text-xs cursor-pointer">
            <div className="flex gap-0.5 items-center">
              <h1 className="text-sm leading-none -mt-0.5">(<span className="text-base mx-0.5">{cart?.length}</span>)</h1>
              <ShoppingCartIcon size={18}/>
            </div>
            <p>My Cart</p>
            <div className="absolute top-[100%] right-0 mt-[17.5px] py-6 px-10 font-main capitalize text-sm rounded bg-teal-600 text-white hidden flex-col gap-4">
              <div className={`flex items-center justify-between w-full gap-10 font-bold ${cart?.length >= 1 ? 'flex' : 'hidden'}`}>
                <p>Item</p>
                <p>Quantity</p>
                <p>Price</p>
              </div>
              {cart.length >= 1 ? cart.map(item => {
                return (
                  <div key={item._id} className="flex items-center justify-between gap-10">
                    <div className="h-9 w-9 border-[1.5px] border-slate-300">
                        <img src={item.imageUrl} alt="item" className="w-full h-full object-cover object-center" />
                    </div>
                    <p className="whitespace-nowrap">0</p>
                    <p className="whitespace-nowrap">&#8369;{soldFormatter(item.price)}</p>
                  </div>
                );
              }) :  <p className="w-full text-center whitespace-nowrap">No items yet!</p>}
            </div>
          </div>
          <div className="flex items-center  relative">
            <div title="Go on" onClick={() => setShowDrop(!showDrop)} className="cursor-pointer hover:bg-white hover:text-teal-600 transition-all duration-200 rounded-full p-0.5">
              <ChevronDownIcon size={20} />
            </div>
            <p className="text-xs">Account </p>
            {showDrop && 
            <div className="absolute top-[100%] mt-7 right-0">
                <NavDropDown setShowDrop={setShowDrop} /> 
            </div>}
          </div>
      </div>
    </div>
  )
}

export default forwardRef(NavBar)
