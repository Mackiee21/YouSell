import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useUserContext } from '../../context/AuthContext';
function Signup() {
  const navigate = useNavigate();
  const { LOGIN } = useUserContext();
      const signUpSchema = z.object({
            name: z.string().min(1, {message: "This field is required"}),
            username: z.string().min(1, {message: "This field is required"})
            .superRefine(async (username, ctx) => {
                  if(username.trim() !== ""){
                    try {
                      const {data: {status} } = await axios.get(`/api/sign-up/verify-username/${username}`)
                      if(status === 'taken'){
                        ctx.addIssue({
                          code: z.ZodIssueCode.custom,
                          message: "This username is already taken"
                        })
                      }
                      return true
                    } catch (error) {
                      console.log(error)
                    }
                  }
            }),
            password: z.string().min(1, {message: "This field is required"}).min(8, {message: "Password must be at least 8 characters"}),
      });
    const { register, handleSubmit, formState: {errors, isSubmitting } } = useForm({
      resolver: zodResolver(signUpSchema)
    });

    const onSubmit = async (data) => {
          try {
            const response = await axios.post("/api/sign-up", data)
            if(response.status === 201){
              alert("Created Successfully")
              LOGIN(response.data.user)
              navigate("/")
            }
          } catch (error) {
            console.log(error)
          }
    }
  return (
    <div className="auth-form-container">
        <h1 className="logo header-logo">SIGN-UP - YOUSELL</h1>
        <h3 className="text-lg logo tracking-wide font-medium text-teal-900 my-3">Register</h3>
        <form className="flex flex-col border border-teal-900 rounded gap-3.5 p-7 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className='input-wrapper flex flex-col justify-center gap-1'>
                  <label className="text-sm font-medium text-teal-900">Name</label>
                  <input {...register("name")} type="text" className='h-9 text-sm font-medium' />
                  {errors.name && (<div className='text-red-500 text-[15px] font-medium'>{errors.name.message}</div>)}
            </div>
            <div className='input-wrapper flex flex-col justify-center gap-1'>
                  <label className="text-sm font-medium text-teal-900">Username</label>
                  <input {...register("username")} type="text" className='h-9 text-sm font-medium' />
                  {errors.username && (<div className='text-red-500 text-[15px] font-medium'>{errors.username.message}</div>)}
            </div>
            <div className='input-wrapper flex flex-col justify-center gap-1'>
                  <label className="text-sm font-medium text-teal-900">Password</label>
                  <input {...register("password")} type="password" className='h-9 text-sm font-black' />
                  {errors.password && (<div className='text-red-500 text-[15px] font-medium'>{errors.password.message}</div>)}
            </div>
            <button disabled={isSubmitting} type="submit" className='bg-teal-900 mt-2 hover:opacity-85 h-9 rounded text-sm font-medium text-white'>{isSubmitting ? "Loading..." : 'Sign-up'}</button>
            <p className='text-base'>Already have an account?<Link to="/login" className='text-teal-900 font-bold cursor-pointer ms-1'>Login</Link></p>
        </form>
    </div>
  )
}

export default Signup
