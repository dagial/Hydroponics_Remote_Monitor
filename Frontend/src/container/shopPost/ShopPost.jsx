import React, {useState} from 'react'
import {selectAuthToken} from "../../store/user/user-selector"
import './ShopPost.css' 
import axios from "axios"
import { useSelector } from 'react-redux'


const ShopPost = ({submittedTimer,close}) => {
  const [product, setProduct] = useState({})
  const AuthToken=useSelector(selectAuthToken)
  function onChangeHandlers(e){
    const { name, value } = e.target;
    setProduct((prevProduct) => ({...prevProduct, [name]: value}))
  }

  function handleSubmit (e){
    e.preventDefault();
    const formData=new FormData( e.target)
    const cfg={
      headers:{
        Authorization:AuthToken
      },
      params:{
        update_type:"product"
      }
    }
    axios.post("http://localhost:8000/adm/",formData,cfg).then(
      response=>{
        close();
        submittedTimer();
        console.log(response.data)
      
      
      }
    ).catch(
      err=>console.log(err)
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label><h5>Name of Product</h5></label>
                <input type="text" name="name" value={product.name} onChange={onChangeHandlers} class="form-control"  placeholder="Name of product" />
            </div>

            <div class="form-group">
                <label><h5>Category</h5></label>
                {/* <input type="text" name="category" value={product.category} onChange={onChangeHandlers} class="form-control"  placeholder="Agriculture or Hydroponics" /> */}
                <select class="form-select" aria-label="Default select example"  name="category" onChange={onChangeHandlers} >
  <option value="agriculture">Agriculture</option>
  <option value="hydroponics">Hydroponics</option>

</select>
            </div>

            <div class="form-group">
                <label for="formGroupExampleInput2"><h5>Description</h5></label>
                <textarea type="text" name="description" value={product.description} onChange={onChangeHandlers} class="form-control" placeholder="Description" rows="5"/>
            </div>

            <div class="form-group">
                <label for="formGroupExampleInput2"><h5>Price</h5></label>
                <input type="number" name='price' value={product.price} onChange={onChangeHandlers} class="form-control" placeholder="Description" />
            </div>

            <div class="form-group">
                <label for="formGroupExampleInput2"><h5>Image</h5></label>
                <input type="file" name="product_image"class="form-control"/>
            </div>

            <button type="submit" class="btn btn-success">Post</button>
        </form>
    </div>
  )
}

export default ShopPost
