import React from 'react'
import {useEffect} from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Blog, Shop, Status, SignIn, SignUp,SingleProduct, SingleBlog,Admin,AdminRoutes} from './pages/page';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { selectUser,selectAuthToken,selectUserObj } from './store/user/user-selector';
import './App.css'
import PrivateRoutes from './pages/privetRoute/privateRoutes';
import { useDispatch } from 'react-redux';
import { setAuthToken, setUser } from './store/user/user_action';
import QA from './container/Q&A/q&a';
import FAQ from './pages/faq/faq';
import BlogT from './container/blogt/blogt';
import OneBlog from './container/One-Blog/oneBlog';
import Loading from './container/loading/loading';

const App = () => {
  const dispatch=useDispatch()

  const userObj=JSON.parse(localStorage.getItem("user"))
  useEffect(()=>{
    
    if(userObj){

      dispatch(setUser(userObj.user))
      dispatch(setAuthToken(userObj.auth_token))
    }
  },[userObj])

  return (
    <div>
      <Router>
      <Routes>
        <Route element={<PrivateRoutes/>}>

          <Route path="/Shop" element={<Shop />} />
          <Route path="/Shop/:productId" element={<SingleProduct />} />
          <Route path="/Status" element={<Status />} />
          </Route>
        
          
          <Route element={<AdminRoutes/>}>
          <Route path="/admin" element={<Admin/>}/>
          
          </Route>
          <Route path="/login" element={<SignIn />} />
          <Route path="/faq" element={<FAQ/>} />
          <Route index element={<Home />} /> 
          <Route exact path="/" element={<Home />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Blog/:blogId" element={<SingleBlog />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/test" element={<Loading/>}/>
          </Routes>  
        
      </Router>
    </div>
  )
}

export default App
