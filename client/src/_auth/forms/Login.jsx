import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserContext } from '../../context/AuthContext';
import Loader from '../../utils/Loader';


function Login() {
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { LOGIN } = useUserContext();
  const navigate = useNavigate();

  //FORM SCHEMA
  const formSchema = z.object({
    username: z.string().min(1, {message: "This is a required field"}),
    password: z.string().min(1, {message: "This is a required field"})
  })
  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm({
    resolver: zodResolver(formSchema)
  });

  const SubmitLogin = async (data) => {
    try {
      const response = await axios.post('/api/login', data);
      LOGIN(response.data.user);
      navigate("/")
    } catch (error) {
      setIncorrectCredentials(true)
      setErrorMessage(error.response.data.error) //THIS IS SOME NEW KNOWLEDGE
    }
  }

  return (
        <div className="auth-form-container">
          <h1 className='logo header-logo'>WELCOME BACK - Yousell</h1>
          <h2 className='text-base md:text-lg logo tracking-wide font-medium text-teal-900 my-3'>Enter you login credentials</h2>
          <div className="w-full grid grid-cols-1 items-center justify-center rounded border border-teal-900 md:px-0">
            <div className={`w-full bg-red-700 tracking-wide text-white text-sm font-medium text-center rounded-b-sm py-3.5 ${!incorrectCredentials && !errorMessage && 'hidden'}`}>{errorMessage}</div>
            <form onSubmit={handleSubmit(SubmitLogin)} className="flex flex-col gap-3.5 w-full p-7">
              <div className='input-wrapper flex flex-col justify-center gap-1'>
                  <label className="text-sm font-medium text-teal-900">Username</label>
                  <input {...register("username")} type="text" className='h-9 text-sm font-medium' />
                  {errors.username && (<div className='text-red-500 text-[15px] font-medium'>{errors.username.message}</div>)}
              </div>
              <div className="input-wrapper flex flex-col justify-center gap-1">
                  <label className="text-sm font-medium text-teal-900">Password</label>
                  <input {...register("password")} type="password" className="font-black h-9" />
                  {errors.password && (<div className='text-red-500 text-[15px] font-medium'>{errors.password.message}</div>)}
              </div>
              <button disabled={isSubmitting} type="submit" className='flex items-center gap-1.5 justify-center bg-teal-900 mt-2 hover:opacity-85 h-9 rounded text-sm font-medium text-white'>
                <p>Login</p>
                {isSubmitting && <Loader />}
              </button>
              <p className='text-base'>Don't have an account?<Link to="/sign-up" className='text-teal-900 font-bold cursor-pointer ms-1'>Sign up</Link></p>
            </form>
          </div>
        </div>
  )
}

export default Login
