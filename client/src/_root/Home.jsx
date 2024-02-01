import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom"
import { useUserContext } from "../context/AuthContext";
import NavBar from "./components/NavBar";

function Home() {
  const { LOGIN } = useUserContext();
  useEffect(() => {
    //1) fetch the current user
      const getUser = async () => {
        try {
          const response = await axios.get("/api/user");
          const { user } = response.data;
          //for instance if user refreshes the page, the data will definitely be lost , will be back to  based on
          //the document.cookie, so atong buhaton nalang is retrieve the data again
          if(user){
            LOGIN(user)
          }
        } catch (error) {
          console.log(error)
        }
      }
      getUser();

    //2) dispatch it


  }, [])
  return (
    <div>
      <NavBar />
      Hello from <br />
      <Link to="/profile">Profile</Link>
      <Link to="/">HOme</Link>
    </div>
  )
}

export default Home
