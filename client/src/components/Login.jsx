import { useState, useEffect } from 'react';
import axios from 'axios';
import { deleteCookie } from '../usableFunc/deleteCookiie';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


function Login() {
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  useEffect(() => {
    deleteCookie('mypokie');
    localStorage.removeItem('mypokie')
  }, [])//logs out user if manually accessed the / route or login page route

  //FORM SCHEMA
  const formSchema = z.object({
    username: z.string().min(1, {message: "This is a required field"}),
    password: z.string().min(1, {message: "This is a required field"})
  })
  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm({
    resolver: zodResolver(formSchema)
  });

  const SubmitLogin = async (data) => {
    console.log(data)
    const response = await axios.post('/api/login', data);
    if(response.data.msg){
      setIncorrectCredentials(true);
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
        <div className="auth-form-container">
          <h1 className='logo header-logo'>WELCOME BACK - Yousell</h1>
          <h2 className='text-lg logo tracking-wide font-medium text-teal-900 my-3'>Enter you login credentials</h2>
          <div className="w-full grid grid-cols-1 items-center justify-center rounded border border-teal-900 md:px-0">
            <div className={`w-full bg-red-700 tracking-wide text-white text-sm font-medium text-center rounded-b-sm py-3.5 ${!incorrectCredentials && 'hidden'}`}>Incorrect email or password</div>
            <form onSubmit={handleSubmit(SubmitLogin)} className="flex flex-col gap-3.5 w-full p-7">
              <div className='input-wrapper flex flex-col justify-center gap-1'>
                  <label className="text-sm font-medium text-teal-900">Username</label>
                  <input {...register("username")} type="email" className='h-9 text-sm font-medium' />
                  {errors.username && (<div className='text-red-500 text-[15px] font-medium'>{errors.username.message}</div>)}
              </div>
              <div className="input-wrapper flex flex-col justify-center gap-1">
                  <label className="text-sm font-medium text-teal-900">Password</label>
                  <input {...register("password")} type="password" className="font-black h-9" />
                  {errors.password && (<div className='text-red-500 text-[15px] font-medium'>{errors.password.message}</div>)}
              </div>
              <button disabled={isSubmitting} type="submit" className='bg-teal-900 mt-2 hover:opacity-85 h-9 rounded text-sm font-medium text-white'>{isSubmitting ? "Loading..." : 'Login'}</button>
              <p className='text-base'>Don't have an account?<Link to="/sign-up" className='text-teal-900 font-bold cursor-pointer ms-1'>Sign up</Link></p>
            </form>
          </div>
        </div>
  )
}

export default Login
