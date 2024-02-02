import Login from "./_auth/forms/Login"
import { Routes, Route} from 'react-router-dom'
import AuthLayout from "./_auth/AuthLayout"
import Signup from "./_auth/forms/Signup"
import RootLayout from "./_root/RootLayout"
import Index from './_root/index'
import Profile from './_root/components/Profile'
import NotFound from './utils/NotFound'
import Home from "./_root/components/Home"
import { useEffect } from "react"
import axios from 'axios'
import { useState } from "react"
import { useNavigate } from 'react-router-dom'


function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
    const interceptor = axios.interceptors.response.use((response) => response, (error) => {
      if(error.response && error.response.status === 401){
        setErrorMessage("Session Expired. Please log in again!");
        setHasError(true);
        localStorage.removeItem("user");
      }
      return Promise.reject(error) //this one's working mak ha
    })
  useEffect(() => {
    return () => axios.interceptors.response.eject(interceptor);
  }, [interceptor])

  const handleClick = () => {
    setErrorMessage("");
    setHasError(false);
    navigate("/login")
  }
  return (
    <div className="relative">
    {hasError && <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col gap-10 rounded-lg bg-zinc-50 border border-teal-600 p-5 shadow shadow-teal-600 ">
        <p className="font-semibold text-teal-600">Session Expired. Please log in again!</p>
        <button onClick={handleClick} className="rounded hover:opacity-85 transition-all duration-200 self-end bg-teal-600 text-white text-sm py-1.5 px-5 font-medium">Hello</button>
      </div>
    </div>}
      <Routes>
        {/*PUBLIC ROUTES */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
        </Route>
        {/*PRIVATE ROUTES */}
          <Route element={<RootLayout />}>
            <Route path="/" element={<Index />}>
              <Route index element={<Home />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
