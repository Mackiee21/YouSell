import { useState, useEffect } from 'react';
import axios from 'axios';
import HomeNavBar from './HomeNavBar';
import { deleteCookie } from '../usableFunc/deleteCookiie';



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
    <div id='hero' className="min-h-svh grid grid-rows-12 grid-cols-5">
        <HomeNavBar className="col-span-12 row-span-1 bg-teal-900 text-white flex items-center" />
        <div className="col-span-2 row-span-11 flex flex-col items-center justify-center">
          <h3 className='logo text-2xl font-black tracking-wider text-teal-900'>Login - YouSell</h3>
          <div className="flex flex-col items-center justify-center py-5">
            {sesExpired && <div className='mb-3 bg-zinc-300 w-96 text-center py-3 font-bold'>Session Expired. You have been logged out!</div> }
            <form onSubmit={SubmitLogin} className="flex flex-col gap-3 w-96 py-7 px-7 rounded border-2 border-teal-900">
              <div className='flex flex-col justify-center gap-1'>
                  <label className="font-black text-base text-teal-900 tracking-wide">Username</label>
                  <input type="text" name="username" value={loginForm.username} onChange={handleChange} className="" />
              </div>
              <div className="flex flex-col justify-center gap-2">
                  <label className="font-black text-base text-teal-900 tracking-wide">Password</label>
                  <input type="password" name="password" value={loginForm.password} onChange={handleChange} className="" />
              </div>
              <button type="submit" className='bg-teal-900 mt-2 hover:opacity-85 py-2.5 rounded font-bold text-white'>Login</button>
            </form>
        </div>
        </div>
      <div className="col-span-3">
      </div>
  </div>
  )
}

export default Login
