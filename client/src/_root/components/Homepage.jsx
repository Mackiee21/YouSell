import { Link } from "react-router-dom"

function Homepage() {
  return (
        <div className="w-[30%]">
          <h1 className="text-[40px] font-extrabold"><span>YouSell</span><br />Sell and Earn</h1>
          <h3 className="tracking-wide text-lg">Have some old Books? Sell with YouSell</h3>
          <div className="mt-4 text-sm grid grid-cols-2 gap-2 tracking-wide">
            <Link to="/login" className="bg-teal-900 hover:opacity-80 py-2 rounded-full font-black text-center text-white transition-opacity duration-150 ease-in-out" >Login</Link>
            <Link to="/sign-up" className="bg-green-800 hover:opacity-80 py-2 rounded-full font-medium text-center text-white transition-opacity duration-150 ease-in-out" >Sign Up</Link>
          </div>
        </div>
        )
}

export default Homepage
