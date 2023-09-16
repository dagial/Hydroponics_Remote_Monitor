import "./input.css"
const Input=({label,labelFor,error,...otherProps})=>{
    return (
        <>
        <label htmlFor={labelFor}>{label}</label>
        <input {...otherProps}/>
        <small className="input_error">{error}</small>
        </>
    )
}
export default Input