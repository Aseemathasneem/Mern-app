import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { signInFailure, signInSuccess, signInstart } from '../redux/user/userSlice'

import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'

export default function SignIn({ userType }) {
  const [formData,setFormData] = useState({})
  const {loading,error} = useSelector((state)=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  

  const handleChange = (e) =>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit =async(e)=>{
    e.preventDefault()
    try {
      dispatch(signInstart())
      const endpoint = userType === 'admin' ? '/api/auth/admin/signin' : '/api/auth/signin';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data =await res.json()
    
      if(data.success === false){
        dispatch(signInFailure(data))
        return
      }
      dispatch(signInSuccess(data))
      if (userType === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
     
    } catch (error) {
      dispatch(signInFailure(error))
    }
    
    
  }
 
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'> 
      {userType === "admin" ? "Admin Sign In" : "Sign In"}</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
        <input type='email'placeholder='Email'id='email'
        className='bg-slate-100 p-3 rounded-lg' 
        onChange={handleChange}/>
        <input type='password'placeholder='Password'id='password'
        className='bg-slate-100 p-3 rounded-lg' 
        onChange={handleChange}/>
        <button  disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' :'Sign In'}
          </button>
          {userType !== 'admin' && <OAuth />}
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account ?</p>
        <Link to='/sign-up'>
        <span className='text-blue-500'>Sign up</span>
        </Link>
        
      </div>
      <p className='text-red-700 mt-5'>{error ? error.message ||'Something went wrong!' :''}</p>
    </div>
  )
}
