import React from 'react'
import './Notification.css'
import {useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { selectAuthToken } from '../../store/user/user-selector'
import axios from "axios"
import { capitalize } from '../../utils'
import Modal from "react-modal"
import {AiOutlineClose } from "react-icons/ai"
import {useNavigate} from "react-router-dom"
import Loading from '../loading/loading'
const Notification = ({submittedTimer,close}) => {
  const [rq,setRq]=useState([])
  const AuthToken=useSelector(selectAuthToken)
  const [modalIsOpen,setModalIsOpen]=useState(false)
  const [isLoading,setIsLoading]=useState(false)
  const [modalItem,setModalItem]=useState(null)
  const [date,setDate]=useState("")
  const navigate=useNavigate()
  useEffect(()=>{
    const cfg={
      headers:{
        Authorization:AuthToken
      }
    }
    axios.get("http://localhost:8000/ordertest/",cfg).then(
      response=>{setRq(response.data)
      console.log(response)}
    ).catch(
      err=>console.log(err)
    )

  },[])
  const handleDateChange=(e)=>{

    setDate(e.target.value)

  }
  const closeModal=()=>{
    setModalIsOpen(false)
  }
  const openModal=()=>{
    setModalIsOpen(true)
  }
  const clickedNotification=(index)=>{

    openModal()
    setModalItem(rq[index])

  }
const handleSetDate=()=>{
  setIsLoading(true)
  const config={
    headers:{
      Authorization:AuthToken
    }
  }

  axios.patch(`http://localhost:8000/order/${modalItem.id}/`,{delivery_date:date},config).then(
    response=>{
      console.log(response)
      setIsLoading(false)
     window.location.reload()
     submittedTimer();
    }
  ).catch(
    err=>console.log(err)
  )


}
  return (
    <div>
        <ul className="notify list-group list-group-flush">
         {rq.map((item,index)=>{
          const {user,orders}=item
          const {name,f_name}=user
          return <li className="request-list list-group-item" onClick={e=>clickedNotification(index)}>{capitalize(name)} {capitalize(f_name)} has placed {orders.length} {orders.length>1?"orders":"order"}. </li>
         })}
            
          
        </ul>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
         <div className="individual-request">
         <p className="closeRequest"><AiOutlineClose  size={25} onClick={closeModal}/></p>
         <div className="request-body">
      <h3 className="request-header">Product Order</h3>
      <p><span className="request-bolder">Ordered by</span>: Dagi Akek</p>
      <p><span  className="request-bolder">Address</span>: city adebabay</p>
      <h5 className="table-header">Orders</h5>
         <table className="request-table">
          
          <tr>
            <th className="request-colmun">Product</th>
            <th className="request-colmun">Category</th>
            <th className="request-colmun">price</th>
            <th className="request-colmun">Quantity</th>
          </tr>
          {modalItem && modalItem["orders"].map((item,index)=>{

            return(
            <tr>
              
              <th>{index+1}. {item.ordered_product.name}</th>
              <th>{item.ordered_product.category}</th>
              <th>{item.ordered_product.price}</th>
              <th>{item.quantity}</th>
            </tr>
            ) 
          })}
         </table>
         <div className="date-input-container">
          <label htmlFor="input-date">Delivery Date: </label>
         <input type="date" className="request-date-input" id="input-date" value={date} onChange={handleDateChange}/>

         </div>
         <div className="set-date-btn">
         <button  class="requestDate todo-btn btn btn-outline-success" type="button" onClick={handleSetDate} >Set Date</button> {isLoading &&<Loading name="order-ld"/>}
         </div>
      </div>
      
         </div>
        </Modal>
    </div>
  )
}

export default Notification
