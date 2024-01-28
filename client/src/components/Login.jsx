import { useState, useEffect } from 'react';
import axios from 'axios';
import { deleteCookie } from '../usableFunc/deleteCookiie';
import { Link } from 'react-router-dom';



function Login({ sesExpired }) {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });
  
  useEffect(() => {
    deleteCookie('mypokie');
    localStorage.removeItem('mypokie')
  }, [])//logs out user if manually accessed the / route or login page route


  const handleChange = (e) => {
    setLoginForm(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const SubmitLogin = async (e) => {
    e.preventDefault();

    const response = await axios.post('/api/login', loginForm);
    if(response.data.msg){
      alert("invalid credentials");
    }
    else{
      console.log('hello', response);
      const cookieName = response.data.cookieMo;
      //took this from chatGPT
      const cookieValue = document.cookie.replace(
        new RegExp(`(?:(?:^|.*;\\s*)${encodeURIComponent(cookieName).replace(/[-.+*]/g, '\\$&')}\\s*\\=\\s*([^;]*).*$)|^.*$`), "$1"
      );
      localStorage.setItem(cookieName, cookieValue);
      window.location.href = response.data.redirectTo;
    }
  }

  return (
        <div className="flex flex-col items-center justify-center">
          <h1 className='logo header-logo'>WELCOME BACK - Yousell</h1>
          <div className='w-full text-center mt-3 gap-1'>
            <h2 className='text-base font-semibold text-teal-900'>Enter you login credentials</h2>
          </div>
          <div className="grid grid-cols-1 items-center justify-center py-5 px-5 md:px-0">
            <form onSubmit={SubmitLogin} className="flex flex-col gap-3 md:w-96 py-7 px-7 rounded border-2 border-teal-900">
              <div className='input-wrapper flex flex-col justify-center gap-1'>
                  <label className="font-black text-base text-teal-900 tracking-wide">Username</label>
                  <input type="text" name="username" value={loginForm.username} onChange={handleChange} className="" />
              </div>
              <div className="input-wrapper flex flex-col justify-center gap-2">
                  <label className="font-black text-base text-teal-900 tracking-wide">Password</label>
                  <input type="password" name="password" value={loginForm.password} onChange={handleChange} className="font-black" />
              </div>
              <button type="submit" className='bg-teal-900 mt-2 hover:opacity-85 py-2.5 rounded font-bold text-white'>Login</button>
              <p>Don't have an account?<Link to="/sign-up" className='text-teal-900 font-bold cursor-pointer ms-1'>Sign up</Link></p>
            </form>
          </div>
        </div>
  )
}

export default Login
