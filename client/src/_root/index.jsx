import { useEffect } from "react"
import { useUserContext } from "../context/AuthContext"
import NavBar from "./components/NavBar"
import axios from "axios";
import { Outlet } from "react-router-dom";


function index() {
    const { LOGIN } = useUserContext();
    useEffect(() => {
        const getUser = async () => {
            try {
              const { data: { user } } = await axios.get("/api/user");
              console.log(user)
              //this is just so when user comesback to our page, (already authenticated)
              //we just have to make a request to get their details
              if(user) LOGIN(user)
            } catch (error) {
              console.log(error)
            }
          }
          getUser();
    }, [])
  return (
      <div className="flex flex-col min-h-svh">
        <NavBar />
        <section className="px-28 py-5">
          <Outlet />
        </section>
        <footer className="w-full bg-teal-600 py-8 px-5 hidden text-white">
          <h2>&copy; YouSell - All rights reserved</h2>
        </footer>
      </div>
  )
}

export default index
