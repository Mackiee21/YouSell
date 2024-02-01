import { Navigate, Outlet } from "react-router-dom"
import { useUserContext } from "../context/AuthContext"

function RootLayout() {
  const { user } = useUserContext();
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default RootLayout
