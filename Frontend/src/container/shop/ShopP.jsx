import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import Product from '../Product/Product';
import PRODUCTS from '../../pages/shopPage/data';
import Modal from "react-modal";
import {useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom';
import { selectUser,selectAuthToken } from '../../store/user/user-selector';
import './ShopP.css';
import axios from "axios"



const PAGE_CART = 'cart';
const PAGE_PRODUCT = 'product';

const ShopP = () => {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCT);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);
  const [searchResult,setSearchResult]=useState([])
  const [searchValue,setSearchValue]=useState("")
  const [filter_by,setFilterBy]=useState("")
  const [location,setLocation]=useState({})
  const [srhCheck,setCheck]=useState(false);
  const user=useSelector(selectUser)
  const AuthToken=useSelector(selectAuthToken)
  const navigate=useNavigate()
  const placeOrder=()=>{
    const Data={

      order:{
        user:user.id,
        address:location.address,
        city:location.city
      },
      items:cart
    }
    
    const cfg={
      headers:{
        Authorization:AuthToken
      }
    }
    console.log(Data)
      axios.post("http://localhost:8000/order/",Data,cfg).then(
        response=>{
          console.log(response)
          navigate("/")
        }
      ).catch(
        err=>console.log(err)
      )
  }


  const selectOnChange=(e)=>{

    setFilterBy(e.target.value)
  }
  const openModal = () => {
    setModalIsOpen(true);
  };
  console.log(cart)
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const addressHandler=(e)=>{

      const {name,value}=e.target
      setLocation({...location,[name]:value})

  }

  const openSearchModal = () =>{
    setSearchModalIsOpen(true);
  }
  const closeSearchModal = () =>{
    setSearchModalIsOpen(false);
  }

  const addToCart = (product) => {
    const itemInCart = cart.find((item) => item.id === product.id);
    if (itemInCart) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1,ordered_product:item.id } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 , ordered_product:product.id}]);
    }
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
  };

  const handleIncrease = (id) => {
    const updatedCart = cart.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setCart(updatedCart);
  };

  const handleDecrease = (id) => {
    const updatedCart = cart.map((product) => {
      if (product.id === id && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setCart(updatedCart);
  };

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const getTotalPrice = () => {
    return cart.reduce((acc, product) => {
      return acc + product.quantity * product.price;
    }, 0);
  };

  const searchHandler=()=>{
    const config={
      params:{
        search_from:"product",
        search:searchValue,
        filter_by
        
      }
    }

    axios.get("http://localhost:8000/search",config).then(
      response=>{
        
        setSearchResult(response.data)

        if (response.data.length==0){
          setCheck(true)
        }
        else{
          setCheck(false)
        }
       
      
      }
    )



  }
  console.log(searchResult)
  const searchOnChangeHandler=(e)=>{

    setSearchValue(e.target.value)

  }

  return (
      <div className='Shop__content container'>
        {page === PAGE_PRODUCT && (
        <>
        <div className='title'>
        <h1>Products</h1>
        <Link onClick={() => navigateTo(PAGE_CART)}><FaShoppingCart size={32} /><span > {cart.length}</span></Link>




<p><FaSearch size={20} onClick={openSearchModal}/> Search</p>
        <Modal isOpen={searchModalIsOpen} onRequestClose={closeSearchModal}>
                <div className='search-shop'>
                <h2>Serarch For Latest Products</h2>
                <Link><AiOutlineClose size={25} onClick={closeSearchModal}/></Link>
                </div>
                <div className="shop-search">
                <div  class="input-group mb-3">
                    <input  type="text" class="form-control" value={searchValue} onChange={searchOnChangeHandler} placeholder="Search For More" aria-label="Search For More" aria-describedby="button-addon2" />
                    <div class="input-group-append">
                      <button  class="srh-btn btn btn-outline-success" type="button" id="button-addon2" onClick={searchHandler}>Search</button>
      </div>
              </div>
              <label >Filter by</label>
              <select name="filter_type" className="slct form-select" onChange={selectOnChange}>
                <option value="">All</option>
        <option value="agriculture">Agriculture</option>
        <option value="hydroponics">Hydroponics</option>
      </select>
              </div>


              <div className='Shop__content-details row row-cols-1 row-cols-md-3'>
        {searchResult.length>0?searchResult.map((product) => {
            const { description} = product;
            const shortDetail = description.substring(0, 100);
              return(
                <div class="Shop__containt-details col mb-4" key={product.id}>
                  <div class="card">
                    <img src={product.product_image} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="cdt card-title">{product.name}</h5>
                      <p class="card-text">{shortDetail}...</p>
                      <div className='detail d-flex justify-content-between align-items-center'>
                          <p class="card-text"><small class="text-muted">Price:<strong> {product.price}.00 birr</strong></small></p>
                          <Link to={`/Shop/${product.id}`} >DETAILS <FaArrowRight/></Link>
                      </div>
                       <Link  className='add btn btn-success' onClick={()=>addToCart(product)}>ADD TO CART</Link>
                    </div>
                  </div>
                </div>
              )
            }):srhCheck && <div>No Results Found</div>}
          </div>
                
          </Modal>
        </div>
          
        <Product addToCart={addToCart} />
    
        </>
        )}



        {page === PAGE_CART && (
          <>
          <div className='cart__title'>
            <h1>Your Shoping Cart</h1>
            <div className='childNav'>
            <Link onClick={() => navigateTo(PAGE_PRODUCT)}><FaArrowLeft size={20}/>BACK</Link>
            <Link onClick={() => navigateTo(PAGE_CART)}><FaShoppingCart size={32} /><span > {cart.length}</span></Link>
          
            </div>
            </div>
          <div className='Shop__content-details'>

            

            {cart.map((product) => {
              const singleTotalPrice = product.price * product.quantity;
              return (
                <div className='Shop__containt-details col mb-4' key={product.id}>
                  <div className='descTitle'>
                    
                 <div className='descriptionTitles__products'>
                  <h5>{product.name}</h5>
                  <div className='Shop__containt-details-quantity'>
                  <button onClick={() => handleIncrease(product.id)}>+</button>
                    <h6 className='quantity'> {product.quantity} </h6>
                  <button onClick={() => handleDecrease(product.id)}>-</button>
                  </div>
                  <h5 className='price'>Price: {singleTotalPrice}$</h5>
                </div>
                <Link  onClick={() => removeFromCart(product)}>
                        <AiOutlineClose size={25}/>
                  </Link> 
                  </div>

                </div>
              );
            })}
            <hr />
            <div className='total-price'>
              <h2>Total Price: {getTotalPrice()}</h2>
            </div>
            <button className='btn btn-success' onClick={openModal}>Order now</button>
              <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <div className='fillOutFormOrder'>
                <h2>Fill Out The Form</h2>
                <Link><AiOutlineClose size={25} onClick={closeModal}/></Link>
                </div>
              <div className='fillOut-form'>
              <form>

              {/* <div className="name form-row">
                <div className="col">
                <label >First Name</label>
                  <input type="text" class="form-control" placeholder="First name" />
                </div>
                <div class="col">
                <label >Last Name</label>
                  <input type="text" class="form-control" placeholder="Last name" />
                </div>
              </div>


                <div class=" e-mail form-row">
                  <div class="form-group col-md-6">
                    <label for="inputEmail4">Email</label>
                    <input type="email" class="form-control" id="inputEmail4" />
                  </div>
                </div> */}



                <div class="Address form-group">
                  <label for="inputAddress">Address</label>
                  <input type="text" class="form-control" id="inputAddress" name="address" value={location.address} onChange={addressHandler} placeholder="1234 Main St" />
                </div> 
                
                <div class="City form-row">
                  <div class="form-group col-md-6">
                    <label for="inputCity">City</label>
                    <input type="text" class="form-control" name="city"  value={location.city} onChange={addressHandler} id="inputCity" />
                  </div>
                </div>
          
                <button type="button" class="orderBtn btn btn-success" onClick={placeOrder}>Place Order</button>
              </form>
              </div>

              </Modal>
          </div>
          </>

        )}
      </div>
  );
};

export default ShopP;
