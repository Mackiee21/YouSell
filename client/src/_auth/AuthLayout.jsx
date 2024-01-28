import { Outlet } from "react-router-dom"

function AuthLayout() {
  return (
      <div id="hero" className="min-h-svh flex flex-col bg-fixed">
        <section className="flex-1 w-full flex items-center px-24 py-10">
          <Outlet />
        </section>
      </div>
  )
}

export default AuthLayout
