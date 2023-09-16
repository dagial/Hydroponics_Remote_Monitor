import React from 'react'
import { Footer } from '../../container'
import  Navbar  from '../../component/Navbar'
import {Link, useNavigate,useParams} from 'react-router-dom'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import BLOGS from '../blogPage/data1'
import {useEffect,useState} from "react" 
import { useSelector } from 'react-redux'
import OneBlog from '../../container/One-Blog/oneBlog'
import axios from "axios"

import './SingleBlog.css'
import { selectAuthToken } from '../../store/user/user-selector'


const SingleBlog = () => {
  const navigate =useNavigate();
  const {blogId} = useParams();

  const [blog,setBlog]=useState({})

  const { title, description, date, image} = blog

  const AuthToken=useSelector(selectAuthToken)

  const [blogs,setBlogs]=useState([])
  useEffect(()=>{
    const cfg={
      headers:{
        Authorization:AuthToken
      }
    }
    axios.get(`http://localhost:8000/blog/${blogId}/`,cfg).then(
      response=>setBlog(response.data)
    ).catch(
      err=>console.log(err.data)
    )


  },[AuthToken])


  return (
    <div className="singleBlog-container">
      <Navbar />
      {/* <div className='blog__detail'>
        <div className='blog__detail-title container'>
          <div className='row-align-items-center'>
            <div className='col-lg-7'>
              <h1>{title}</h1>
            </div>
          </div>
        </div>

        <div className='container content'>
          <div className='row'>
            <div className='col-lg-5'>
              <img src={image} alt='' className='img-wrap'/>
            </div>
            <div className='blog__detail-desc col-lg-7'>
              <h2>{title}</h2>
              <p className='price'>{date}</p>
              <p>{description}</p>

              <br />
              <span onClick={()=>navigate(-1)}><FaArrowLeft /><small> BACK</small></span>
              <Link to="/Blog"  >continue to Blog <FaArrowRight /></Link>
            </div>
          </div>
        </div>
      </div> */}
      <OneBlog title={title} description={description} image={image} date={date}/>
      <div className='blog__detail-desc col-lg-7'>
              <span onClick={()=>navigate(-1)}><FaArrowLeft /><small> BACK</small></span>
              <Link to="/Blog"  >continue to Blog <FaArrowRight /></Link>
            </div>
      <Footer />
   </div>
  )
}

export default SingleBlog
