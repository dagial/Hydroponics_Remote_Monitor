import React from 'react'
import { Footer , ShopP  } from '../../container'
import Navbar from '../../component/Navbar'

const Shop = () => {
  return (
    <div className='Shop'>
      <div className='Shop__bg'>
        <Navbar />
      </div>
      <ShopP />
      <Footer />
    </div>
  )
}

export default Shop
