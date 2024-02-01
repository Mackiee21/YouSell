import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useUserContext } from "../../context/AuthContext"
import Loader from "../../utils/Loader";


function NavBar() {
  const { user, LOGOUT }  = useUserContext();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

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
    <div className="py-2.5 px-10 bg-teal-900 text-white flex items-center justify-between z-[1000]">
      <Link to="/"><h1 className="logo text-xl tracking-widest font-bold text-white">YouSell</h1></Link>
      <div className="flex items-center gap-5">
          <p>Hi, {user.name} </p>
          <button disabled={loggingOut} className="border flex items-center justify-center gap-1.5 rounded hover:opacity-85 text-sm font-bold bg-teal-900 py-1.5 px-5" onClick={handleLogout}>
            <p>Logout</p>
            {loggingOut && <Loader />}
          </button>
      </div>
    </div>
  )
}

export default NavBar
