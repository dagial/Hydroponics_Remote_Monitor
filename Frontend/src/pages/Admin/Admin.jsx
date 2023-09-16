import React, { useState } from 'react'
import { FaBell } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { VerticalNavbar, Notification, Todo } from '../../container'
import leaf from '../../assets/leaf.png'
import Modal from "react-modal";
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user/user-selector';

import './Admin.css'

const Admin = () => {
  const user=useSelector(selectUser)
  const [submitted,setSubmitted]=useState(false)
    console.log(user)
  const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
      };
      const submittedTimer=()=>{
        setSubmitted(true)
        setTimeout(()=>{

          setSubmitted(false)


        },3000)


      }




  return (
    <div>
     
      <VerticalNavbar submittedTimer={submittedTimer}/>
     
      <div className='header-admin scale-up-center'>
      <div className="admin-success">
      {submitted && <div className="input-success">
                    successfully submitted
                </div>}
                </div>
        <img src={leaf} alt='Logo'/>
        <h1>Welcome Back Admin</h1>
      </div>
      



      <p className='bell' onClick={openModal}><FaBell size={25}/></p>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <div className='notification'>
            <h2>Orders</h2>
            <p><AiOutlineClose size={25} onClick={closeModal}/></p>
        </div>
        <Notification submittedTimer={submittedTimer} close={closeModal}/>              
      </Modal>
      <Todo />
    </div>
  )
}

export default Admin
