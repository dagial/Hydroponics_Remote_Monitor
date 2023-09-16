import React, { useState } from 'react'
import leaf from '../../assets/leaf.png'
import { useDispatch,useSelector } from 'react-redux';
import { setUser,setAuthToken } from '../../store/user/user_action';
import './SignIn.css'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { selectUserObj } from '../../store/user/user-selector';
import NetworkError from '../../container/networkError/netwrokError';
import {Link} from "react-router-dom"
import Loading from '../../container/loading/loading';

const SignIn = () => {
    const [formData,setFormData]=useState({})
    const [isLoading,setIsLoading]=useState(false);
    const [errors,setErrors]=useState({
        error:false,
        message:false
    })
    const navigate= useNavigate()

    const dispatch=useDispatch()
    const userData=useSelector(selectUserObj)
    const handleSubmit =async (e) => {
        e.preventDefault();
        setIsLoading(true)
       const response=await axios.post("http://127.0.0.1:8000/auth/token/login/",formData,{headers:{
            "Content-Type":"application/json"
        }}).then(
            response=>{
                const auth_token=`Token ${response.data.auth_token}`; 
                dispatch(setAuthToken(auth_token))
               setIsLoading(false);
               return response.data }
        ).catch(
            err=>setErrors({
                error:true,
                message:err.response.data.non_field_errors
            })
        )
        
        const auth_token=`Token ${response.auth_token}`; 
       const user=await axios.get("http://localhost:8000/auth/users/me/",{headers:{
        Authorization:auth_token
       }}).then(
        response=>{
           dispatch(setUser(response.data))
           navigate("/")
        }
       ).catch(
        err=>{
            console.log(err)
        }
       )
        };
    localStorage.setItem("user",JSON.stringify(userData))
    const onChangeHandler=({target})=>{
        const {name,value}=target
        setFormData({...formData,[name]:value})

    }

        
        console.log(isLoading)
  return (
    <div className='SignIn'>
        <div className='SignIn__form'>
          
            <div className='SignIn__form-title' onClick={()=>{navigate("/")}}>
                <img src={leaf} alt='Logo'/>
                <h1>Hydro</h1>
            <div className='SignIn__form-title-log-in'>
                <h1>Log In</h1>
            </div>
            </div>
            <div className='SignIn__form-fill'>
               
                <form onSubmit={handleSubmit}>
                    <div className="row">
                    {errors.error &&<div className="login-error"><NetworkError err={errors.message}/></div>}
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email"  name="email" value={formData["email"]} placeholder='  Enter Your Email' onChange={onChangeHandler} required/>

                    {/* <label htmlFor="phone">Phone Number:</label>
                    <input type="tel" id="phone" value={phoneNumber} placeholder='  Enter Phone Number' onChange={handlePhoneChange} required/> */}

                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData["password"]} placeholder='  Enter Password' onChange={onChangeHandler} required/>

                    <button type="submit" className={isLoading?"btn-loading lbtn btn btn-success":"lbtn btn btn-success"} >
                      Login{isLoading && <span><Loading/></span>} 
                    </button>
                    <div className="signin-small">
                    <small className="register-link"><Link to="/Signup">register to a new account?</Link></small>
                    <small className="register-link"><Link to="/Signup">Forgot password?</Link></small>
                    </div>
                    </div>
                </form>
               
            </div>
        </div>
      
    </div>
  )
}

export default SignIn
