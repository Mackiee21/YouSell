import { useLayoutEffect } from "react";
import { Link } from "react-router-dom"
import { isUserAuthenticated } from '../middlewares/userAuth';
import HomeNavBar from "./HomeNavBar";

function Homepage() {
  const isAuthenticated = isUserAuthenticated();
  useLayoutEffect(() => {
    if(isAuthenticated){
      document.title = "Signing in... - Yousell"
      window.location.href = "/profile";
    }
  }, [])
  return (
    !isAuthenticated ? 
      <div id='hero' className="min-h-dvh grid grid-rows-12 grid-cols-5">
        <HomeNavBar />
        <div className="col-span-2 row-span-11 flex items-center justify-center">
           <div className="">
           <h1 className="text-[40px] font-extrabold"><span>YouSell</span><br />Sell and Earn</h1>
              <h3 className="tracking-wide text-lg">Have some old Books? Sell with YouSell</h3>
              <div className="mt-4 text-sm grid grid-cols-2 gap-2 tracking-wide">
                <button className="bg-teal-900 hover:opacity-80 py-2 rounded-full font-black text-center text-white transition-opacity duration-150 ease-in-out" onClick={() => window.location.href = "/login"}>Login</button>
                <button className="bg-green-800 hover:opacity-80 py-2 rounded-full font-medium text-center text-white transition-opacity duration-150 ease-in-out" onClick={() => window.location.href = "/signup"}>Sign Up</button>
            </div>
           </div>
        </div>
      <div className="col-span-3">
      </div>
  </div> : null
  )
}

export default Homepage
