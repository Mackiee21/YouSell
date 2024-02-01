import { Outlet, useSearchParams } from "react-router-dom"
import { useUserContext } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";

function AuthLayout() {
  const { user } = useUserContext();
  if(user){
    window.location.href = "/"
  }
  return (
      <div id="hero" className="min-h-svh flex flex-col bg-fixed">
        <section className="flex-1 w-full flex items-center px-28 py-10">
          <Outlet />
        </section>
      </div>
  )
}

export default AuthLayout
