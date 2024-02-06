import { Outlet } from "react-router-dom"
import { useUserContext } from "../context/AuthContext"


function AuthLayout() {
  const { user } = useUserContext();
  if(user){
    window.location.href = "/"
  }
  return (
      <div id="hero" className="min-h-dvh">
        <section className="h-full flex md:items-center px-7 md:px-28 py-16 md:py-10">
          <Outlet />
        </section>
      </div>
  )
}

export default AuthLayout
