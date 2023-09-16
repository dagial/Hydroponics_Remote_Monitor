import {useState} from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { selectAuthToken } from "../../store/user/user-selector"


const Presets=({submittedTimer,close})=>{

        const [form,setForm]=useState({})
        const AuthToken=useSelector(selectAuthToken)

        const handleFormChange=({target})=>{
            
            const {name,value}=target
            setForm({...form,[name]:value})

        }
        const handleFromSubmit=(e)=>{

                const config={

                    headers:{

                        Authorization:AuthToken
                    }

                }
                axios.post(`http://localhost:8000/status/`,form,config).then(
                    response=>{
                        close();
                        submittedTimer();
                        console.log(response)
                    
                    }
                ).catch(
                    err=>console.log(err)
                )



        }


    return (

<div>
        <form >
            <div class="form-group">
                <label><h5>Name of Product</h5></label>
                <input type="text" name="name" value={form.name} onChange={handleFormChange} class="form-control"  placeholder="Name of product" />
            </div>

            <div class="form-group">
                <label for="formGroupExampleInput2"><h5>Min_Tempreture</h5></label>
                <input type="number" name="min_temp" value={form.min_temp} onChange={handleFormChange} class="form-control" placeholder="Min_Tempreture" />
            </div>

            <div class="form-group">
                <label for="formGroupExampleInput2"><h5>Max_Tempreture</h5></label>
                <input type="number" name="max_temp"value={form.max_temp} onChange={handleFormChange} class="form-control" placeholder="Max_Tempreture" />
            </div>

            <button type="button" onClick={handleFromSubmit} class="btn btn-success">Post</button>

            
        </form>
    </div>

    )
}

export default Presets