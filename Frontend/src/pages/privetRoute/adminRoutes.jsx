import {Navigate,Outlet} from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../../store/user/user-selector"

const AdminRoutes=()=>{

    let user=null
    const currentUser=JSON.parse(localStorage.getItem("user"))
 
    const reduxUser=useSelector(selectUser)
    if(currentUser){
        user=currentUser
    }
    else{
        user=reduxUser
    }
    const is_admin=user?user.user.is_admin:false
    console.log(is_admin)
return (
    is_admin ? <Outlet/>:<Navigate to="/login"/>
)

}
export default AdminRoutes