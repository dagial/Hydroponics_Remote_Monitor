import React, {useState} from 'react'
import './BlogPost.css'
import { useSelector } from 'react-redux'
import { selectAuthToken } from '../../store/user/user-selector'
import axios from "axios"

const BlogPost = ({submittedTimer,close}) => {
    const [news, setNews] = useState({})
    const AuthToken=useSelector(selectAuthToken)

    function onChangeHandlers(e){
        const { name, value } = e.target;
        setNews((prevNews) => ({...prevNews, [name]: value}))
      }
    
      function handleSubmit (e){
        e.preventDefault();
        const formData=new FormData(e.target)
        const cfg={
            headers:{
                Authorization:AuthToken
            },
            params:{
                update_type:"blog"
            }
        }
        axios.post("http://localhost:8000/adm/",formData,cfg).then(
            response=>{
                close();
                submittedTimer();
                console.log(response.data)
            
            
            }
        ).catch(
            err=>console.log(err)
        )
      }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label><h5>Title</h5></label>
                <input type="text" name="title" value={news.title} onChange={onChangeHandlers} class="form-control"  placeholder="Blog Title" />
            </div>

            <div class="form-group">
                <label for="formGroupExampleInput2"><h5>Content</h5></label>
                <textarea name="description" value={news.description} onChange={onChangeHandlers} class="form-control" placeholder="Blog Content" rows="5"></textarea>
            </div>

            <div class="form-group">
                <label for="formGroupExampleInput2"><h5>Image</h5></label>
                <input type="file" name="image" class="form-control"/>
            </div>

            <button type="submit" class="btn btn-success">Post</button>

            
        </form>
    </div>
  )
}

export default BlogPost
