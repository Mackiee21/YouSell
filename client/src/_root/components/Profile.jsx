import axios from "axios"
import { useEffect } from "react"
import { Link } from 'react-router-dom'

function Profile() {
  useEffect(() => {
    const makeAGet = async () => {
     try {
      const res = await axios.get("/api/auth/status");
      console.log(res)
     } catch (error) {
        console.log(error.response)
     }
      
    }
    
  }, [])

  return (
    <div>
      Hello from profile
      <Link to="/">Home</Link>
    </div>
  )
}

export default Profile
