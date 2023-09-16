import img from "../../assets/24443777644_6ef9e6d2d7_b-1-1024x680-1024x680.jpg"
import  "./oneBlog.css"
const OneBlog=({title,description,date,image})=>{

    return(
        <div className="oneblog-container">
            <div className="oneblog-title">
                    {title}
                </div>
            <img src={image} alt='src' className="oneblog-img"/>
            <div className="oneblog-body">
            <div className="oneblog-header">

                <div className="oneblog-date">
                    {date}
                </div>
                </div>

                <div className="oneblog-description">
                &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;{description}
                </div>
            </div>
        </div>
    )


}

export default  OneBlog;