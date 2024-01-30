import Login from "./_auth/forms/Login";
import { Routes, Route} from 'react-router-dom';
import NotFound from "./components/NotFound";
import AuthLayout from "./_auth/AuthLayout";
import Signup from "./_auth/forms/Signup";
import Home from "./_root/Home";
import RootLayout from "./_root/RootLayout";
import Profile from "./_root/profile";

function App() {
  console.log("natawag diba ko")
  return (
      <Routes>
        {/*PUBLIC ROUTES */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
        </Route>
        {/*PRIVATE ROUTES */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        <Route path="*"  element={<NotFound />}/>
      </Routes>
  )
}

export default App
