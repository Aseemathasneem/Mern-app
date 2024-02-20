import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'


export default function SignUp() {
  const [formData,setFormData] = useState({})
  const [error,setError] = useState(false)
  const [loading,setLoading]  = useState(false)
  const navigate = useNavigate()


  const handleChange = (e) =>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit =async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      setError(false)
      const res = await fetch('/api/auth/admin/addUser',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      
      const data =await res.json()
      setLoading(false)
      if(data.success === false){
        setError(true)
        return
      }
      navigate('/admin/dashboard')
     
    } catch (error) {
      setLoading(false)
      setError(true)
    }
    
    
  }
 
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Add User</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text'placeholder='username'id='username'
        className='bg-slate-100 p-3 rounded-lg' 
        onChange={handleChange}/>
        <input type='email'placeholder='Email'id='email'
        className='bg-slate-100 p-3 rounded-lg' 
        onChange={handleChange}/>
        <input type='password'placeholder='Password'id='password'
        className='bg-slate-100 p-3 rounded-lg' 
        onChange={handleChange}/>
        <button  disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' :'Add user'}
          </button>
          
      </form>
     
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
    </div>
  )
}