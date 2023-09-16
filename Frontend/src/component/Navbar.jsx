import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import './navbar.css'
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri'
import leaf1 from '../assets/leaf1.png'
import './navbar.css'
import { useSelector } from 'react-redux';
import { selectUser } from '../store/user/user-selector';
import NetworkError from '../container/networkError/netwrokError';
import { selectError } from '../store/networkError/network_selector';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser,setAuthToken } from "../store/user/user_action"
import { setNetworkError } from '../store/networkError/network_action';
import { selectAuthToken } from '../store/user/user-selector';
import { AiOutlineSetting } from 'react-icons/ai';

import axios from "axios"


const Menu = () =>(
  <>
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/Blog">Blog</Link></li>
    <li><Link to="/Shop">Shop</Link></li>
    <li><Link to="/Status">Status</Link></li>
  </ul>
  </>
)

const Navbar = () => {
  const user=useSelector(selectUser)
  const networkError=useSelector(selectError)
  const isAdmin= user? user.is_admin:false
  const dispatch=useDispatch()
    const AuthToken=useSelector(selectAuthToken)
    const navigate=useNavigate()
  console.log(networkError)
  const[toggleMenu, setToggleMenu] = useState(false);
  const handleLogOut=()=>{
    
    const cfg={
        headers:{
            "Content-Type":"application/json",
            Authorization:AuthToken
        }
    }
    axios.post("http://localhost:8000/auth/token/logout/",AuthToken,cfg).then(
      response=>{
          localStorage.removeItem("user");
          dispatch(setUser(null));
          dispatch(setAuthToken(null))
          dispatch(setNetworkError(false))
          navigate("/login")
      }
  ).catch(err=>{
      dispatch(setNetworkError(true))
  })
  }
  return (
    <>
    <div className='hydroponic__navbar'>
      <div className='hydroponic__navbar-links'>
        <div className='hydroponic__navbar-links_logo'>
          <img src={leaf1} alt='logo' />
          <h1>HYDRO</h1>
        </div>
        <div className='hydroponic__navbar-links_container'>
        <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/Blog">Blog</Link></li>
    <li><Link to="/Shop">Shop</Link></li>
    <li><Link to="/Status">Status</Link></li>
    {isAdmin && <li><Link to="/admin">Admin</Link></li>}
  </ul>
        </div>
      </div>
      <div className='hydroponic__navbar-sign'>
        {user ?<p onClick={handleLogOut} className="logout-class">Logout</p>:
        <p><Link to="/login">Login</Link></p>
        }
        <button type='button'><Link to="/signup">Sign Up</Link></button>
      </div>
      <div className='hydroponic__navbar-menu'>
        {toggleMenu
        ? <RiCloseLine color='black' size={27} onclick={()=> setToggleMenu(false) }/> 
         :<RiMenu3Line color='black' size={27} onclick={()=> setToggleMenu(true)}/>
         }
         {toggleMenu && (
          <div className='hydroponic__navbar-menu_container scale-up-center'>
            <div className='hydroponic__navbar-menu_container-links'>
              <Menu />
              <div className='hydroponic__navbar-menu_container-links-sign'>
                <p><Link to="/login">Login</Link></p>
                <button type='button'><Link to="/SignUp">Sign Up</Link></button>
              </div>
            </div>

          </div>
         )}


      </div>
      
    </div>
    {networkError &&<div className="error-class">
  <NetworkError err={"please check your network connectivity"}/>
</div>}
    </>
  )
}

export default Navbar
