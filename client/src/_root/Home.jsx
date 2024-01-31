import { Link } from "react-router-dom"
import { useUserContext } from "../context/AuthContext"

function Home() {
  return (
    <div>
      Hello from Private <br />
      <Link to="/profile">Profile</Link>
      <Link to="/">HOme</Link>
    </div>
  )
}

export default Home
