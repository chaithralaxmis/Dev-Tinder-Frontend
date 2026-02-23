import { useReducer, useState } from "react";
import { login } from "../utility/apiFunction";
import { useNavigate } from "react-router";

let initialState = {
    emailID:"",
    password:""
}

function reducer(state,action){
    return {
        ...state,
        [action.field]:action.value}
}




function Login() {
const inputClass = `block text-sm/6 font-medium p-2 rounded-md
         bg-gray-800 text-white placeholder-gray-400
         
         w-full`;
    const [state,dispatch] = useReducer(reducer, initialState);
    const [errors,setErrors] = useState([]);
    const navigate = useNavigate()
    function validate(){
    let newObject = {}
    Object.keys(state).forEach((key)=>{
        if(state[key].length === 0){
            return "Required"
        }
    })
    setErrors(newObject)
}
async function submit(){
    try {
      if(Object.keys(errors).length != 0) return ;
      const res = await login(state);
      if(res.status==200){
        console.log(res.data.data)
        // localStorage.setItem("token",res.data.data)
        document.cookie=`token=${res.data.data}`
        navigate("/feed")
      } 
    } catch (error) {
        console.log(error)
    }
}

const goToRegister = () =>{
    navigate("/register")
}

const goToForgot = () =>{
    navigate("/forgot")
}

  return (
    <div className="register-container p-7 md:flex md:justify-center md:flex-col md:items-center">
      <h6 className="text-4xl font-bold text-center">Dev Tinder</h6>
      <form className="flex flex-col gap-5 register-form md:p-4 md:w-lg rounded-sm  md:my-5">
        <h2 className="text-2xl font-semibold m-3 text-base txacking-wide  text-center">
          Welcome Back !
        </h2>
        
        <div>
          <input
            id="emailID"
            placeholder="Enter Email ID"
            className={inputClass}
            onChange={(e) =>
              dispatch({ field: "emailID", value: e.target.value })
            }
            value={state.emailID}
            onBlur={validate}
          />
          {errors["emailID"] && (
            <span className="text-red-500 font-semibold m-0 text-xs">
              * {errors["emailID"]}
            </span>
          )}
        </div>
        <div>
          <input
            id="password"
            placeholder="Enter Password"
            className={inputClass}
            value={state.password}
            onChange={(e) =>
              dispatch({ field: "password", value: e.target.value })
            }
            onBlur={validate}
          />
          {errors["password"] && (
            <span className="text-red-500 font-semibold m-0 text-xs">
              * {errors["password"]}
            </span>
          )}
        </div>
        
        <div
          type="submit"
          id="submit"
          className="text-center bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 p-3 font-bold text-lg tracking-widest text-white rounded-sm cursor-pointer"
          onClick={submit}
        >
          Login
        </div>
        {/* <div className="my-3 text-center">
           <span className="cursor-pointer" onClick={goToForgot}>Forgot Password?</span>
        </div>
        <hr/> */}
        <div className="my-3 text-center">
          New User? <span className="underline cursor-pointer" onClick={goToRegister}>SignUp</span>
        </div>
      </form>
    </div>
  )
}

export default Login