import "./networkError.css"
const NetworkError=({err})=>{

    return (
        <div className="network-error scale-up-center">
            {err} 
            </div>
    )
}

export default NetworkError