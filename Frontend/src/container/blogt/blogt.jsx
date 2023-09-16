import { AiOutlineClose } from "react-icons/ai"
import img from "../../assets/24443777644_6ef9e6d2d7_b-1-1024x680-1024x680.jpg"
import { Link } from "react-router-dom"
import "./blogt.css"
const BlogT=({title,description,image,date,id})=>{

    return (
        <div className="blogt-container">
            
      
            <img src={image} alt="dk" className="bg-image"/>
  
            <div className="blogt-body">
                <div className="blogt-header">
            <div className="blogt-title">
                {title}
            </div>
            <small className="blogt-date">{date}</small>
            </div>
            <div className="blogt-description">
            &nbsp; &nbsp; &nbsp;  {description} . . .
            </div>
            <Link to={`/Blog/${id}`}><button className="blogt-btn">Read More</button></Link>
            
        </div>




        </div>
    )


}
export default BlogT