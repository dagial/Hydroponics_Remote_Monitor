import {Navigate,Outlet} from "react-router-dom"
import { selectUser } from "../../store/user/user-selector"
import { setUser } from "../../store/user/user_action"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect } from "react"


const PrivateRoutes=()=>{
    let user=null
    const currentUser=JSON.parse(localStorage.getItem("user"))
 
    const reduxUser=useSelector(selectUser)
    if(currentUser){
        user=currentUser
    }
    else{
        user=reduxUser
    }



    

    return (
        user.user? <Outlet/>:<Navigate to="/login"/>

    )


}
export default PrivateRoutes