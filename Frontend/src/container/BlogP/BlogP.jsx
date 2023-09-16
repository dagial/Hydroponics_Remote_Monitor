import axios from 'axios';
import React from 'react'
import {useEffect,useState} from "react"
import { Link } from 'react-router-dom';
import BLOGS from '../../pages/blogPage/data1';
import './BlogP.css';
import {useSelector} from "react-redux"
import { selectAuthToken ,selectUser} from '../../store/user/user-selector';
import BlogT from '../blogt/blogt';
import { AiOutlineClose } from 'react-icons/ai';



const BlogP = () => {
  const AuthToken=useSelector(selectAuthToken)
  const [reload,setReload]=useState(true)
  const user=useSelector(selectUser)
  const is_admin=user?user.is_admin:false

  const [blogs,setBlogs]=useState([])
  useEffect(()=>{
    const cfg={
      headers:{
        Authorization:AuthToken
      }
    }
    console.log(cfg)
    axios.get("http://localhost:8000/blog/",cfg).then(
      response=>setBlogs(response.data)
    ).catch(
      err=>console.log(err.data)
    )


  },[AuthToken,reload])
  console.log(blogs)
  
//   return (
//     <div className='BlogP__content container'>
//       <div className='BlogP__content-title'>
//         <h1>Latest</h1>
//       </div>
// 
//       <div className="BlogP__detail-body row row-cols-1 row-cols-md-3">
//         {blogs.map((blog)=>{
//           const { description} = blog;
//           const shortDescription = description.substring(0, 100);
//           return(
//             <div class="BlogP__containt-details col mb-4">
//               <div class="card">
//                 <img src={blog.image} class="card-img-top" alt="..." />
//                 <div class="card-body">
//                   <h5 class="card-title">{blog.title}</h5>
//                   <p class="card-text">{shortDescription}...</p>
//                   <div className='d-flex justify-content-between align-items-center'>
//                       <p class="card-text"><small class="text-muted">Date:<strong className="blog_date"> {blog.date}</strong></small></p>
//                       <Link to={`/Blog/${blog.id}`} className='btn btn-success'>Read More</Link>
//                     </div>
//                 </div>
//               </div>
//             </div>
//           
//  
//             )
//         })}
//     </div>
//   </div>
//       
//     
//   )

  const handleBlogDelete=(id)=>{
    const config={
      headers:{
        Authorization:AuthToken
      }
    }

    axios.delete(`http://localhost:8000/blog/${id}/`,config).then(
      response=>{
        setReload(!reload)  
        console.log(response)
      }
    ).catch(
      err=>console.log(err)
    )


  }

        return (
          <div className="blogs-container">
            <div className="blogs-title">
              Latest
            </div>
      
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
        )

}

export default BlogP
