import { useEffect, useReducer, useState } from "react";
import { register } from "../utility/apiFunction";
import { useNavigate } from "react-router";

const formData = {
  firstName: "",
  lastName: "",
  emailID: "",
  password: "",
  confirmPassword: "",
};

function reducer(state, action) {
  console.log(state, action);
  return {
    ...state,
    [action.field]: action.value,
  };
}

function Register() {
  const inputClass = `block text-sm/6 font-medium p-2 rounded-md
         bg-gray-800 text-white placeholder-gray-400
         md:bg-white md:text-gray-900
         md:border md:border-gray-400 w-full`;

  const [state, dispatch] = useReducer(reducer, formData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  async function validate() {
    let newErrors = {};
    Object.keys(state).forEach((key) => {
      console.log(key, state[key]);
      if (state[key].length == 0) {
        newErrors[key] = "Requied";
      }else if(key == 'firstName' && (state[key].length < 4 || state.length >50) ){
        newErrors[key] = "Char length should be between 4 to 50";
      }else if(key == 'lastName' &&  state.length >50){
        newErrors[key] = "Char length should be less than 50";
      }else if(key == 'emailID' &&  !isValidEmail(state[key])){
        newErrors[key] = "Enter valid email address";
      }else if(key == 'confirmPassword' && state[key] != state['password']){
        newErrors[key] = "Confirm password mismatch";
      }
    });
    setErrors(newErrors);
  }
  async function submit() {
      try {
        event.preventDefault();
        await validate();
        if(Object.keys(errors).length  != 0) return;
        let payload = state;
        delete payload.confirmPassword
        const res = await register(payload)
        if(res.status==200){
            console.log("Registered successfully!")
            Object.keys(formData).forEach((key)=>{
              dispatch({field:key,value:""})
            })
            setErrors([])
        }
    } catch (error) {
        
    }
  }

  function isValidEmail(email){
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);

  }

  const goToLogin = () =>{
    navigate("/login")
  }

  return (
    <div className="register-container p-7 md:flex md:justify-center md:flex-col md:items-center">
      <h6 className="text-4xl font-bold text-center">Dev Tinder</h6>
      <form className="flex flex-col gap-5 register-form md:bg-white md:text-black md:p-4 md:w-lg rounded-sm  md:my-5">
        <h2 className="text-2xl font-semibold m-3 text-base txacking-wide md:text-black text-center">
          Create your developer ID
        </h2>
        <div>
          <input
            id="firstName"
            type="text"
            placeholder="Enter First Name"
            className={inputClass}
            value={state.firstName}
            onBlur={validate}
            onChange={(e) =>
              dispatch({ field: "firstName", value: e.target.value })
            }
          />
          {errors["firstName"] && (
            <span className="text-red-500 font-semibold m-0 text-xs">
              * {errors["firstName"]}
            </span>
          )}
        </div>
        <div>
          <input
            id="lastName"
            placeholder="Enter Last Name"
            className={inputClass}
            onBlur={validate}
            value={state.lastName}
            onChange={(e) =>
              dispatch({ field: "lastName", value: e.target.value })
            }
          />
          {errors["lastName"] && (
            <span className="text-red-500 font-semibold m-0 text-xs">
              * {errors["lastName"]}
            </span>
          )}
        </div>
        <div>
          <input
            id="emailID"
            placeholder="Enter Email ID"
            className={inputClass}
            value={state.emailID}
            onChange={(e) =>
              dispatch({ field: "emailID", value: e.target.value })
            }
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
            type="password"
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
        <div>
          <input
            id="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            className={inputClass}
            value={state.confirmPassword}
            onChange={(e) =>
              dispatch({ field: "confirmPassword", value: e.target.value })
            }
            onBlur={validate}
          />
          {errors["confirmPassword"] && (
            <span className="text-red-500 font-semibold m-0 text-xs">
              * {errors["confirmPassword"]}
            </span>
          )}
        </div>
        <div
          type="submit"
          id="submit"
          className="text-center bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 p-3 font-bold text-lg tracking-widest text-white rounded-sm cursor-pointer"
          onClick={submit}
        >
          REGISTER
        </div>
        <div className="my-3 md:text-black text-center">
          Already have an account? <span className="underline cursor-pointer" onClick={goToLogin}>Login</span>
        </div>
      </form>
    </div>
  );
}

export default Register;
