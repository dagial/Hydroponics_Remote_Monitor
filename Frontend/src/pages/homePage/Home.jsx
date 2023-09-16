import React from 'react'
import { About,BlogCard,Header,Footer } from '../../container'
import  Navbar  from '../../component/Navbar'
import './Home.css'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAuthToken ,selectUser} from '../../store/user/user-selector';
import axios from 'axios'
import BlogT from '../../container/blogt/blogt'
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom'

const Home = ({blog}) => {
  const AuthToken=useSelector(selectAuthToken)
  const [blogs,setBlogs]=useState([])
  const user=useSelector(selectUser)
  const is_admin=user?user.is_admin:false
  useEffect(()=>{
    const cfg={
      headers:{
        Authorization:AuthToken
      },
      params:{
        page:"home"
      }
    }
    console.log(cfg)
    axios.get("http://localhost:8000/blog/",cfg).then(
      response=>setBlogs(response.data)
    ).catch(
      err=>console.log(err.data)
    )


  },[AuthToken])
  const handleBlogDelete=(id)=>{
    const config={
      headers:{
        Authorization:AuthToken
      }
    }

    axios.delete(`http://localhost:8000/blog/${id}/`,config).then(
      response=>{
 
        console.log(response)
      }
    ).catch(
      err=>console.log(err)
    )


  }
  
  return (
    <div className='Home'>
      <div className='gradient__bg'>
        <Navbar />
        <Header />
      </div>
      <div>
        <About />
        <div className="home-blog">
          <Link to="/blog" className="home-blog-header">Blogs</Link>
          <div className="home-blog-content">
        {
              blogs.map(blog=>{
                const { description} = blog;
                console.log(blog.id)
         const shortDescription = description.substring(0, 200);
                return (
                
                <div className="single-blog">
                  {is_admin && <AiOutlineClose className="blog-delete" onClick={(e)=>handleBlogDelete(blog.id)}/>}
                  <BlogT description={shortDescription} title={blog.title} image={blog.image} date={blog.date} id={blog.id}/>
                  </div>)
              })
            }
            </div>
            </div>
        <Footer />
      </div>
      
    </div>
  )
}

export default Home
