import { Outlet } from "react-router-dom"
import { useUserContext } from "../context/AuthContext"


function AuthLayout() {
  const { user } = useUserContext();
  if(user){
    window.location.href = "/"
  }
  return (
      <div id="hero" className="min-h-dvh flex flex-col bg-fixed">
        <section className="flex-1 w-full flex items-center px-7 md:px-28 py-10">
          <Outlet />
        </section>
      </div>
  )
}

export default AuthLayout
