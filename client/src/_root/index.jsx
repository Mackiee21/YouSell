import { useEffect, useRef } from "react"
import { useUserContext } from "../context/AuthContext"
import NavBar from "./components/NavBar"
import axios from "axios";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";


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
      <div className="flex flex-col h-dvh overflow-hidden">
        <NavBar />
        <section className="flex-1 flex overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto px-2 md:px-10 pt-5 pb-5 md:pb-10">
            <Outlet />
            <footer className="w-full bg-teal-600 py-8 px-5 hidden text-white">
              <h2>&copy; YouSell - All rights reserved</h2>
            </footer>
          </main>
        </section>
       
      </div>
  )
}

export default index
