import React, { useState } from 'react'
import leaf from '../../assets/leaf.png'
import './SignUp.css'
import axios from 'axios'
import Input from '../../container/inputField/input'
import { useNavigate } from 'react-router-dom'
import NetworkError from '../../container/networkError/netwrokError'
import Loading from '../../container/loading/loading'
const SignUp = () => {
  const [formData,setFormData]=useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [fieldErrors,setFieldErrors]=useState({})
    const [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true)
    await axios.post ("http://localhost:8000/auth/users/", formData,{
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      response=>{
        setIsLoading(false)
        navigate("/login")}
    ).catch(
      err=>{
        setIsLoading(false)
        setFieldErrors(err.response.data)
      console.log(err)}
    )

       

     
    
  };
  const onChangeHandler=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value})
  }
  return (
    <div className='SignUp'>
      <div className='SignUp__form'>
            <div className='SignUp__form-title'>
                <img src={leaf} alt='Logo'/>
                <h1>Hydro</h1>
            <div className='SignUp__form-title-sign-up'>
                <h1>Sign Up</h1>
            </div>
            </div>
            <div className='SignUp__form-fill'>
              <form onSubmit={handleSubmit}>
                <div className='row'>
                
              <Input labelFor="name" label="Name" type="text" error={fieldErrors["name"]} 
             className={`form-control ${fieldErrors["name"]?"form_field_errors":""}`} id="name" name="name" value={formData["name"]} 
              placeholder='  Name' onChange={onChangeHandler} required={true}/>
              
                <Input labelFor="father's name" label="Fateher's Name"  error={fieldErrors["f_name"]} 
                 type="text" className={`form-control ${fieldErrors["f_name"]?"form_field_errors":""}`} id="f_name" name="f_name" value={formData["f_name"]} placeholder='  Fathers Name' 
                 onChange={onChangeHandler} required={true}/>
                
               
                <Input labelFor="email" label="Email"  error={fieldErrors["email"]} 
                 type="email" className={`form-control ${fieldErrors["email"]?"form_field_errors":""}`} id="email" name="email" value={formData["email"]} placeholder='  Enter Your Email' 
                 onChange={onChangeHandler} required={true}/>

              
                <Input labelFor="phone" label ="Phone Number"  error={fieldErrors["phone_number"]} 
                 type="tel" className={`form-control ${fieldErrors["phone_number"]?"form_field_errors":""}`} 
                id="phone" value={formData["phone_number"]} name="phone_number" placeholder='  Enter Your Phone Number' 
                onChange={onChangeHandler} required= {true}/>
                
                <Input labelFor="password" label="Password"  error={fieldErrors["password"]} 
                type="password" className={`form-control ${fieldErrors["password"]?"form_field_errors":""}`} id="password" value={formData["password"]} name="password" placeholder='  Enter Password' 
                onChange={onChangeHandler} required={true}/>


               <Input labelFor="re_password" label="Verify Password"  error={fieldErrors["re_password"]} 
                type="password"className={`form-control ${fieldErrors["re_password"]?"form_field_errors":""}`} id="verify-password" value={formData["re_password"]}  name="re_password"
                 placeholder='  Enter Password Again' onChange={onChangeHandler} required={true}/>
                 <div className="non_field_form_errors"> {fieldErrors["non_field_errors"]&& <NetworkError err={fieldErrors["non_field_errors"]}/>}</div>
                <button type="submit" className="fbtn btn btn-success" >
                  Sign Up{isLoading && <Loading/>}
                </button>
                </div>
              </form>
                
            </div>
        </div>
      
    </div>
  )
}

export default SignUp
