import './q&a.css'
import { useSelector } from 'react-redux'
import { selectUser ,selectAuthToken} from '../../store/user/user-selector'
import { AiOutlineSend } from 'react-icons/ai'
import axios from "axios"
import { useState } from 'react'



const QA=({question,answer,id,date,setReload})=>{
    const {user}=useSelector(selectUser)
    const is_admin=user?user.is_admin:false;
    const [adminAnswer,setAdminAnswer]=useState("")
    const AuthToken=useSelector(selectAuthToken)
    const [showAnswer,setShowAnswer]=useState(false)
    const answerHandler=(e)=>{
        setAdminAnswer(e.target.value)
    }
    const handleAnswer=()=>{
        const config={
            headers:{
                Authorization:AuthToken
            }
        }
axios.patch(`http://localhost:8000/faq/${id}/`,{answer:adminAnswer},config).then(
    response=>{
        setReload(id)
        console.log(response)
    }
).catch(
    err=>console.log(err)
)

    }

    return (
        <div className="qa-container">
            <div className="q-container">
                <span className="bld">Q: </span>{question}?
            </div>
            <small className="qa-date">uploaded on: {date}</small>
            
            {showAnswer && <div className="a-container">
                
            <span className="bld">A: </span>&nbsp;&nbsp;{answer? answer:<span>
                <input type="text" className="adminAnswer" value={adminAnswer} onChange={answerHandler}/>
                <button type="button" className="btn" onClick={handleAnswer}><AiOutlineSend className="answer-btn "/></button>
                </span>}
            </div>}
            <div className="sh-answer" onClick={()=>{

setShowAnswer(!showAnswer)
}}>
    {showAnswer? "hide answer": "show Answer" }
</div>
        </div>
    )
}

export default QA