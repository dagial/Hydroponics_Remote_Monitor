import React from 'react'
import {Link} from 'react-router-dom'
import {useState,useEffect} from "react"
import axios from "axios"
import { useSelector } from 'react-redux'
import { selectAuthToken,selectUser } from '../../store/user/user-selector'
import {FaArrowRight} from 'react-icons/fa'
import 'bootstrap/dist/css/bootstrap.min.css';
import PRODUCTS from '../../pages/shopPage/data'
import './product.css'
import { AiOutlineClose } from 'react-icons/ai'



const Product = ({addToCart}) => {
    const AuthToken=useSelector(selectAuthToken)
    const [Products,setProducts]=useState([])
    const user=useSelector(selectUser)
    const is_admin=user? user.is_admin:false
    const [reload,setReload]=useState(false)


    useEffect(()=>{
      const cfg={
        headers:{
          Authorization:AuthToken
        }
      }
      axios.get(`http://localhost:8000/products/`,cfg).then(
        response=>setProducts(response.data)
      ).catch(
        err=>console.log(err.data)
      )
  
  
    },[AuthToken,reload])

    const deleteHandler=(e,id)=>{
      const config={
        headers:{
          Authorization:AuthToken
        }
      }
      axios.delete(`http://localhost:8000/products/${id}/`,config).then(
        response=>{
          setReload(!reload)
          console.log(response)
        }
      ).catch(
        err=>console.log(err)
      )
    }
  return (
    <>
    
    <div className='Shop__content-details row row-cols-1 row-cols-md-3'>
        {Products.map((product) => {
            const { description} = product;
            const shortDetail = description.substring(0, 100);
              return(
                <div class="Shop__containt-details col mb-4" key={product.id}>
                  {is_admin && <div className="delete-product">
                  <AiOutlineClose  onClick={(e)=>deleteHandler(e,product.id)}/></div>}
                  <div class="cm card">
                    
                    <img src={product.product_image} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="pt card-title">{product.name}</h5>
                      <p class="card-text">{shortDetail}...</p>
                      <div className='detail d-flex justify-content-between align-items-center'>
                          <p class="card-text"><small class="text-muted">Price:<strong> {product.price}</strong></small></p>
                          <Link to={`/Shop/${product.id}`} >DETAILS <FaArrowRight/></Link>
                      </div>
                       <Link  className='add btn btn-success' onClick={()=>addToCart(product)}>ADD TO CART</Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
  )
}

export default Product
