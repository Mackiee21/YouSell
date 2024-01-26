import Login from "./components/Login";
import Homepage from "./components/Homepage";
import axios from 'axios';
import { Routes, Route} from 'react-router-dom';
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useState } from "react";
import Profile from "./components/Profile";
import Signup from "./components/Signup";

function App() {
  const [sesExpired, setSesExpired] = useState(false);
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login sesExpired={sesExpired} />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoutes sesExpired={sesExpired} setSesExpired={setSesExpired} />}>
            <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
