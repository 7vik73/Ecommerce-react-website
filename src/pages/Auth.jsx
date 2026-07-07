import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Auth() {
  const [mode, setMode] = useState("signup")
  const [error,setError] = useState(null)
  const navigate = useNavigate()
  const { signUp,login } = useAuth()
  const {register,handleSubmit,formState:{errors}} = useForm()


  function onSubmit(data){
    let result
    if(mode === "signup"){
      result = signUp(data.email,data.password)
    }else{
      result = login(data.email,data.password)
    }
    console.log(result)
    if(result.success){
      navigate("/")
    }else{
      setError(result.error)
    }
   
  }
  return (
    <div className='page'>
      <div className='container'>
        <div className='auth-container'>
          <h1 className='page-title'>{mode === "signup" ? "Sign up" : "Login"}</h1>
          <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
            {error && <div className='error-message'>{error}</div> }
            <div className='form-group'>
              <label htmlFor="email" className='form-label' >Email</label>
              <input type="email" name="email" id="email" placeholder='Enter email' className='form-input' {...register("email",{
                required:"Email is required"
              })} />
              {errors.email && <span className='form-error'>{errors.email.message}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor="password" className='form-label' >Password</label>
              <input type="password" name="password" id="password" placeholder='Enter password' className='form-input' {...register("password",{
                required:"Password is required",
                minLength:{
                  value:4,
                  message:"Min length is 4"
                },
                maxLength:{
                  value:12,
                  message:"Max length is 12"
                }
              })} />
            </div>
            {errors.password && <span className='form-error'>{errors.password.message}</span>}
            <button type='submit' className='btn btn-primary btn-large'>{mode === "signup" ? "Sign up" : "Login"}</button>
          </form>
          <div className='auth-switch'>
            {mode === "signup" ? <p>Already have an account? <span className='auth-link' onClick={() => { setMode("login") }}>Login</span> </p> : <p>Don't have an account? <span className='auth-link' onClick={() => { setMode("signup") }}>Sign Up</span> </p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth