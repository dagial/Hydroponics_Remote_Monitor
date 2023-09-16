import React, { useState } from 'react';
import profile from '../../assets/profile.png'
import { AiOutlineClose } from 'react-icons/ai';
import {ShopPost, BlogPost} from '../../container'
import Modal from "react-modal";
import './vertical.css'
import FAQ from '../../pages/faq/faq';
import Presets from '../presets/presets';
import { useNavigate } from 'react-router-dom';
const VerticalNavbar = ({submittedTimer}) => {

    const [shopModalIsOpen, setShopModalIsOpen] = useState(false);
    const [blogModalIsOpen, setBlogModalIsOpen] = useState(false); 
    const [askQuestionModal,setAskQuestionModal]=useState(false);
    const [presetModal,setPresetModal]=useState(false);
    const navigate=useNavigate()


    const openAskQuestion=()=>{
        setAskQuestionModal(true)
    }
    const closeAskQuestion=()=>{
        setAskQuestionModal(false)
    }
    const openShopModal = () => {
        setShopModalIsOpen(true);
      };
    const openPresetModal=()=>{
        setPresetModal(true)
    }
    const closePresetModal=()=>{
        setPresetModal(false)
    }
      const closeShopModal = () => {
        setShopModalIsOpen(false);
      };

      const openBlogModal = () => {
        setBlogModalIsOpen(true);
      };
    
      const closeBlogModal = () => {
        setBlogModalIsOpen(false);
      };



  return (
    <div className='vertNav'>
        <nav class="nav flex-column">
            <div className='profile-img'>
                <img src={profile} alt='profile pic' />
                <div className='profile-desc'>
                    <h5>Name: Admin</h5>
                    <p>Supervisor for the web</p>
                </div>
                <br />
                <hr />
            </div >
            <ul>
                <li onClick={()=>navigate("/")}><h5>Home</h5></li>
                <li onClick={openShopModal}><h5>Shop</h5></li>
                    <Modal isOpen={shopModalIsOpen} onRequestClose={closeShopModal}>
                    <div className='shop__admin-post'>
                        <h2>Post The Latest Product</h2>
                        <AiOutlineClose size={25} onClick={closeShopModal}/>
                    </div>
                        <ShopPost  submittedTimer={submittedTimer} close={closeShopModal}/>
                    </Modal>
                
                
                
                <li onClick={openBlogModal}><h5>Blog</h5></li>
                    <Modal isOpen={blogModalIsOpen} onRequestClose={closeBlogModal}>
                        <div className='shop__admin-post'>
                            <h2>Post The Latest News</h2>
                            <AiOutlineClose size={25} onClick={closeBlogModal}/>
                        </div>
                            <BlogPost submittedTimer={submittedTimer} close={closeBlogModal}/>
                    </Modal>
                    <li onClick={openAskQuestion}><h5>Asked questions</h5></li>
                    <Modal isOpen={askQuestionModal} onRequestClose={closeAskQuestion}>
                    <div className='shop__admin-post'>
                        <h2>Asked Questions</h2>
                        <AiOutlineClose size={25} onClick={closeAskQuestion}/>
                    </div>
                    <FAQ/>
                    </Modal>
                    <li onClick={openPresetModal}><h5>Presets</h5></li>
                    <Modal isOpen={presetModal} onRequestClose={closePresetModal}>
                    <div className='shop__admin-post'>
                        <h2>Asked Questions</h2>
                        <AiOutlineClose size={25} onClick={closePresetModal}/>
                    </div>
                    <Presets submittedTimer={submittedTimer} close={closePresetModal}/>
                    </Modal>
            </ul> 
        </nav>
    </div>
  )
}

export default VerticalNavbar
