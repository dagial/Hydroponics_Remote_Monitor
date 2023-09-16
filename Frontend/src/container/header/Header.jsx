import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai';
import './Header.css'
import hydroSystem from '../../assets/hydroSystem.png'
import SEARCH from './searchData';
import Modal from "react-modal";
import {useSelector} from "react-redux"
import {selectAuthToken} from "../../store/user/user-selector"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [search,setSearch]=useState("")
  const [results,setResults]=useState([])
  const AuthToken=useSelector(selectAuthToken)
  const navigate=useNavigate()

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const searchChangeHandler=(e)=>{
    setSearch(e.target.value)
  }

  const handleSearch=(e)=>{
      const cfg={
        headers:{
          Authorization:AuthToken,
        },
        params:{
          search_from:"blog",
          search
        }
      }
      console.log(cfg)
      axios.get("http://localhost:8000/search",cfg).then(
        response=>setResults(response.data)
      ).catch(
        err=>console.log(err)
      )
  }

  return (
    <div className='hydroponic__Header'>
      <div className='hydroponic__Header-content'>
        <h1>Hydroponic System</h1>
        <p>Hydroponic can be defined as growing plants in water containing nutrients. Examples of this type of hydroponic systems includes NFT (nutrient film technique) systems and deep-water float systems where plant roots are set in nutrient solutions. Another definition of hydroponic is growing plants without soil.</p>
        
        <div  class="input-group mb-3">
          <input onClick={openModal} type="text" class="form-control" placeholder="Search For More" aria-label="Search For More" aria-describedby="button-addon2" />
          <div class="input-group-append">
          
          </div>
          </div>
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <div className='fillOutFormOrder'>
                <h2>Search For More</h2>
                <Link><AiOutlineClose size={25} onClick={closeModal}/></Link>
                </div>

                <div className='hydroponic__search'>
                <div  class="input-group mb-3">
                  <input  type="text" class="form-control" value={search} onChange={searchChangeHandler}  placeholder="Search For More" aria-label="Search For More" aria-describedby="button-addon2" />
                <div class="input-group-append">
                <button  class="btn btn-outline-success" type="button" id="button-addon2" onClick={handleSearch} >Search</button>
                </div>
                </div>
                </div>
                <hr />

                <div className='hydroponic__search-result row row-cols-1 row-cols-md-3'>
                  {results.map((search) => {
  
                    return(
                      
                      <div class="search-c card" onClick={(e)=>navigate(`/blog/${search.id}`)}>
                        {/* <h5 class="card-header">{search.title}</h5> */}
                        <div class="card-body">
                          <h5 class="cdt card-title">{search.title}</h5>
                          <p class="card-text">{search.description.substring(0, 100)} . . .</p>
                        </div>
                      </div>
                   
                    )
                  } )}
                </div>
          </Modal>
        
        
        
      </div>
      <div className='hydroponic__Header-picture'>
        <img src= {hydroSystem} alt='Hydroponic System' />
      </div>
    </div>
  )
}

export default Header
