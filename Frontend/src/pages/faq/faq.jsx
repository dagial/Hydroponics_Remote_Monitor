import Navbar from "../../component/Navbar"
import QA from "../../container/Q&A/q&a"
import { Footer } from "../../container"
import "./faq.css"
import {useState,useEffect} from "react" 
import {AiOutlineSend} from "react-icons/ai"
import axios from "axios"
import { useSelector } from "react-redux"
import { selectAuthToken,selectUser } from "../../store/user/user-selector"
import { useLocation } from "react-router-dom"

const FAQ=()=>{

    const [question,setQuestion]=useState("")
    const {pathname}=useLocation()
    const [reload,setReload]=useState(false)
    const [submitted,setSubmitted]=useState(false)
    const [faqItems,setFaqItems]=useState([])
    const AuthToken=useSelector(selectAuthToken)
    const user=useSelector(selectUser)

    const is_admin=user? user.is_admin: false
    useEffect(()=>{
        console.log("useEffect run")
        const config={
            headers:{
                Authorization:AuthToken
            }
        }
        if(pathname=="/admin"){
            config.params={
                type:"q"
            }
        }
        console.log(config)
        if(AuthToken){axios.get("http://localhost:8000/faq/",config).then(
            response=>{
                setFaqItems(response.data)
                console.log(response)
            }
        ).catch(
            err=>console.log(err)
        )}


    },[AuthToken,reload])


    const questionHandler=(e)=>{

        setQuestion(e.target.value)

    }
    const handleAsk=()=>{
        const config={
            headers:{
                Authorization:AuthToken
            },
        }
        
axios.post("http://localhost:8000/faq/",{question},config).then(
    response=>{
        setQuestion("")
        setSubmitted(true)
        setTimeout(()=>{

            setSubmitted(false)
        },3000)
    }
).catch(
    err=>console.log(err)
)
    }
    return (
        <div >
            {pathname=='/faq' && <Navbar/>}
            <div className="faq-container">
                <div className="faq-body">
                {submitted && <div className="input-success">
                    successfully submitted
                </div>}
                <h3 className="faq-header"> Frequently Asked Questions</h3>
               
                {!is_admin &&<div className="faq-input">
                
                <input className="ask-input" type="text" placeholder="Ask Your Question" value={question} onChange={questionHandler}/>
                <div>
                <button className="sendbtn btn" type="button" onClick={handleAsk}><AiOutlineSend className="sendIcon"/></button> 
                </div>
                </div>}
        
        <div className="questions">{
            faqItems.map(item=>{
                const {question,answer,id,date}=item
                return  <div className="QA" key={id}><QA question={question} date={date} key={id} answer={answer} id={id} setReload={setReload}/></div> 
            })
        }
        </div>
           </div>
           </div>
         {pathname=='/faq'  &&  <Footer/>}
        </div>
    )
}
export default FAQ