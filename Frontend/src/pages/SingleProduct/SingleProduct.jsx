import React from 'react'
import { Footer } from '../../container'
import {useEffect,useState} from "react"
import { useSelector } from 'react-redux'
import { selectAuthToken } from '../../store/user/user-selector'
import  Navbar  from '../../component/Navbar'
import {Link, useNavigate,useParams} from 'react-router-dom'
import { FaArrowLeft,FaArrowRight } from 'react-icons/fa'
import PRODUCTS from '../shopPage/data'
import './SingleProduct.css'
import axios from "axios"

const SingleProduct = () => {

  const navigate =useNavigate();
  const {productId} = useParams();
  const AuthToken=useSelector(selectAuthToken)

  const [product,setProduct]=useState([])
  useEffect(()=>{
    const cfg={
      headers:{
        Authorization:AuthToken
      }
    }
    if(AuthToken){
    axios.get(`http://localhost:8000/products/${productId}/`,cfg).then(
      response=>{
      setProduct(response.data)
      console.log(response.data)
    }
    ).catch(
      err=>console.log(err.data)
    )
    }

  },[AuthToken])
 const { name, price, description,product_image} = product
  return (
    <div>
      <Navbar />
      <div className='shop__detail-title container'>
        <div className='row-align-items-center'>
          <div className='col-lg-7'>
            <h1>{name}</h1>
          </div>
        </div>
      </div>

      <div className='container content'>
        <div className='row'>
          <div className='col-lg-5'>
            <img src={product_image} alt='' className='img-wrap'/>
          </div>
          <div className='shop__detail-desc col-lg-7'>
            <h2>{name}</h2>
            <p className='price'>Price: {price}$</p>
            <p>{description}</p>

            <br />
            <span onClick={()=>navigate(-1)}><FaArrowLeft /><small> BACK</small></span>
              <Link to="/shop"  >continue to Shop <FaArrowRight /></Link>
          </div>
        </div>
      </div>


      <Footer />
    </div>
  )
}

export default SingleProduct
