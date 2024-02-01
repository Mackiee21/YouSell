import Login from "./_auth/forms/Login"
import { Routes, Route} from 'react-router-dom'
import AuthLayout from "./_auth/AuthLayout"
import Signup from "./_auth/forms/Signup"
import RootLayout from "./_root/RootLayout"
import Index from './_root/index'
import Profile from './_root/components/Profile'
import NotFound from './utils/NotFound'
import Home from "./_root/components/Home"


function App() {
  return (
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
  )
}

export default App
