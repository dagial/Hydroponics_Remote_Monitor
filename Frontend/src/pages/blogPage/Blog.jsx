import React from 'react'
import { BlogP, Footer } from '../../container'

import  Navbar  from '../../component/Navbar'
import './Blog.css'

const Blog = () => {
  return (
    <div className='Blog'>
      <div className='Blog__bg'>
        <Navbar />
      </div>
      <div>
        <BlogP />
        <Footer />
      </div>
      
    </div>
  )
}

export default Blog
