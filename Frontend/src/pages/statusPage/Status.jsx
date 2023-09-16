import React from 'react'
import Navbar from '../../component/Navbar'
import {Footer } from '../../container'
import STATUS from './Stat'
import {useEffect,useState} from "react"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectAuthToken } from '../../store/user/user-selector'
import './Status.css'
import Loading from "../../container/loading/loading"


const Status = () => {

  const [parameters,setParameters]=useState([])
  const [sensorData,setSensorData]=useState(null)
  const [isLoading,setIsLoading]=useState(false)
  
  const {Humidity,Temperature,Ph,Ec}=STATUS
  const AuthToken=useSelector(selectAuthToken)
  useEffect(()=>{
    const config={
      headers:{

        Authorization:AuthToken

      }
    }
    if(AuthToken){

    axios.get(`http://localhost:8000/status/`,config).then(
    response=>{
      setParameters(response.data)
      console.log(response)
    }
    ).catch(
      err=>console.log(err)
    )}



  },[AuthToken])


  const handleParamChange=({target})=>{
    setSensorData(null)
    setIsLoading(true)
    const [name,value]=target
    console.log(value.value)
    const config={
      headers:{

        Authorization:AuthToken

      }
    }
    axios.get(`http://localhost:8000/status/${value.value}/`,config).then(
      response=>{
        console.log(response)
        setSensorData(response.data)
        setIsLoading(false)}
    ).catch(
      err=>console.log(err)
    )

  }

  return (
    <div className="status-container">
      <Navbar />

      <select name="params" className="param-select" onChange={handleParamChange}>
        <option value="">Choose Vegetable Preset</option>
        {
          parameters.map(param=>{

            return <option value={param.id}>{param.name}</option>

          })
        }

      </select>
      

      <div className="card-stat-main row row-cols-1 row-cols-md-2">
      {/* {STATUS.map((status)=>{
        return(
          
            <div className="col mb-4">
              <div className="card-stat-img card">
                <img src={status.Image} class="card-img-top" alt={status.Title}/>
                <div className="card-stat card-body">
                  <h5 className="card-title">{status.Title}</h5>
                  <p className="card-text">{status.Value}</p>
                </div>
              </div>
            </div>
          
        )
      })} */}
      <div className="col mb-4">
              <div className="card-stat-img card">
                <img src={Humidity.Image} class="card-img-top" alt={Humidity.Title}/>
                <div className="card-stat card-body">
                  <h5 className="card-title">{Humidity.Title}</h5>
                  <p className="card-text">{sensorData? sensorData["Humidity"]: " ---"}% RH <span className="loading-span">{isLoading &&<Loading name="loading-ptr"/>}</span></p>
          
        
  
                </div>
              </div>
            </div>
            <div className="col mb-4">
              <div className="card-stat-img card">
                <img src={Temperature.Image} class="card-img-top" alt={Temperature.Title}/>
                <div className="card-stat card-body">
                  <h5 className="card-title">{Temperature.Title}</h5>
                  <p className="card-text">{sensorData? sensorData["Temperature"]: " ---"} &deg;C<span className="loading-span">{isLoading &&<Loading name="loading-ptr"/>}</span></p>
                </div>
              </div>
            </div>
   </div>


      <Footer />
    </div>
  )
}

export default Status
