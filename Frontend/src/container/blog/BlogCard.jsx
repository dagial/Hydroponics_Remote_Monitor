import React from 'react';
import { Link } from 'react-router-dom';
import BLOGS from '../../pages/blogPage/data1';


import './Blog.css';

const BlogCard = () => {

  
  
  return (
    <div className='blogHome'>
      <div className='blogCard__content'>
        <h2>Blog</h2>
      </div>
      
      <div className="blogCard row row-cols-1 row-cols-md-3">
        {BLOGS.map((blog)=>{
          const { description} = blog;
          const shortDescription = description.substring(0, 100);
          return(
            <div class="card-deck">
              <div class="card">
                <img src={blog.image} class="card-img-top" alt="..."/>
                <div class="card-body">
                  <h5 class="card-title">{blog.title}</h5>
                  <p class="card-text">{shortDescription}</p>
                  <div className='d-flex justify-content-between align-items-center'>
                      <p class="card-text"><small class="text-muted">Date:<strong> {blog.date}</strong></small></p>
                      <Link to={`/Blog/${blog.id}`} className='btn btn-success'>Read More</Link>
                    </div>
                </div>
              </div>
            </div>
          )
        })}
    </div>
   </div>
    

  )
}

export default BlogCard
