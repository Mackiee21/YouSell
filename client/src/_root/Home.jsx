import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom"
import { useUserContext } from "../context/AuthContext";
import NavBar from "./components/NavBar";

function Home() {
  useEffect(() => {
    

  }, [])
  return (
    <div>
      <NavBar />
      <section className="">
        <div>

        </div>
      </section>
    </div>
  )
}

export default Home
