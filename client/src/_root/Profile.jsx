import axios from "axios"
import { useEffect } from "react"

function Profile() {
  useEffect(() => {
    const makeAGet = async () => {
      const res = await axios.get("/api/auth/status");
      console.log(res)
    }
    makeAGet()
  }, [])
  return (
    <div>
      Hello from profile

    </div>
  )
}

export default Profile
