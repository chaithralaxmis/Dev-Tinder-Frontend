import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { editProfile, getProfile } from "../utility/apiFunction";
const initialState = {
  firstName: "chai",
  lastName: "1",
  photoURL:
    "data:image/jpeg;base64,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",
  photoFile: "",
  emailID: "",
  yearOfExp: "",
  websiteURL: "",
  githubURL: "",
  linkedInURL: "",
  about: "",
  designation: "",
  skills: [],
};

function reducer(state, action) {
  return {
    ...state,
    [action.field]: action.value,
  };
}

function Profile() {
  const inputClass = `block text-sm/6 font-medium p-2 rounded-md
         bg-gray-800 text-white placeholder-gray-400 w-full`;

  // const API_SECRATE = "LTk5NRW57myYGYywoO6ngl5zzl8";
  // const API_KEY = "911412465337789"
  // dev-tinder
  const uploadPhoto = async () => {
    const formData = new FormData();
    formData.append("file", state.photoURL);
    formData.append("upload_preset", "dev-tinder");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dzmyuwigf/image/upload",
      formData,
    );
    if (res) {
      return { cloudinaryID: res.data.public_id, url: res.data.secure_url };
    }
  };
  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      console.log(reader);
      dispatch({ field: "photoURL", value: reader.result });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    let photoRes = await uploadPhoto();
    console.log(photoRes)
    if (photoRes) {
      let payload = {
        ...state,
        photoURL: photoRes.url,
        cloudinaryID: photoRes.cloudinaryID,
      };
      console.log(payload)
      const res = await editProfile(payload);
      if (res.status == 200) {
        console.log("Profile update successully!");
      }
    }
  };

  const handleSkills = (e) => {
    console.log(e)
    let newSkills = [...state.skills, skill];
    dispatch({ field: "skills", value: newSkills });
    setSkill("")
  };

  const handleSkillEnter = (e) => {
    console.log(e,e.key)
    if (e.key == "enter" ||  e.key == 'Enter') {
      handleSkills(e);
    }
  };

  const removeSkill =(index)=>{
    let skills = state.skills;
    skills.splice(0,index);
    dispatch({field:"skills",value:skills})
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [skill,setSkill] = useState("")
  const getProfileData = async () => {
    const res = await getProfile();
    if (res) {
      Object.keys(res.data).forEach((key) => {
        console.log(key);
        dispatch({ field: key, value: res.data[key] });
      });
    }
    console.log(state, "state");
  };

  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <div className="flex-1 p-5 overflow-auto">
      <div className="font-bold text-2xl md:hidden flex items-center justify-center mb-3 mt-10">
        <img
          src="../../../public/assets/fire-svgrepo-com.svg"
          className="w-10"
        />
        Dev Tinder
      </div>
      <h6 className="font-bold text-xl">My Profile</h6>
      <div className="flex flex-wrap gap-5">
        <div className="w-full md:w-[45%]">
          <img src={state.photoURL} className="w-[120px] h-[120px] rounded-full"/>
          <input type="file" accept=".png,.jpg" onChange={handleUpload} />
        </div>
        <div className="w-full md:w-[45%]">
          <textarea
            id="about"
            placeholder="Enter about yourself"
            className={inputClass}
            rows="5"
            max-rows="5"
            value={state.about}
            onChange={(e) => {
              dispatch({ field: "about", value: e.target.value });
            }}
          />
        </div>
        <div className="w-full md:w-[45%]">
          <input
            id="firstName"
            placeholder="Enter First Name"
            className={inputClass}
            value={state.firstName}
            onChange={(e) => {
              dispatch({ field: "firstName", value: e.target.value });
            }}
          />
        </div>
        <div className="w-full md:w-[45%]">
          <input
            id="lastName"
            placeholder="Enter Last Name"
            className={inputClass}
            value={state.lastName}
            onChange={(e) => {
              dispatch({ field: "lastName", value: e.target.value });
            }}
          />
        </div>
        <div className="w-full md:w-[45%]">
          <input
            id="emailID"
            placeholder="Enter Email ID"
            className={inputClass}
            value={state.emailID}
            onChange={(e) => {
              dispatch({ field: "emailID", value: e.target.value });
            }}
          />
        </div>
        <div className="w-full md:w-[45%]">
          <input
            id="designation"
            placeholder="Enter Designation"
            className={inputClass}
            value={state.designation}
            onChange={(e) => {
              dispatch({ field: "designation", value: e.target.value });
            }}
          />
        </div>
        <div className="w-full md:w-[45%]">
          <input
            id="experience"
            placeholder="Enter Experience"
            className={inputClass}
            value={state.yearOfExp}
            onChange={(e) => {
              dispatch({ field: "yearOfExp", value: e.target.value });
            }}
          />
        </div>

        <div className="w-full md:w-[45%]">
          <input
            id="linkedInURL"
            placeholder="Enter linkedIn URL"
            className={inputClass}
            value={state.linkedInURL}
            onChange={(e) => {
              dispatch({ field: "linkedInURL", value: e.target.value });
            }}
          />
        </div>
        <div className="w-full md:w-[45%]">
          <input
            id="GithubURL"
            placeholder="Enter Github URL"
            className={inputClass}
            value={state.githubURL}
            onChange={(e) => {
              dispatch({ field: "githubURL", value: e.target.value });
            }}
          />
        </div>
        <div className="w-full md:w-[45%]">
          <input
            id="websiteURL"
            placeholder="Enter website URL"
            className={inputClass}
            value={state.websiteURL}
            onChange={(e) => {
              dispatch({ field: "websiteURL", value: e.target.value });
            }}
          />
        </div>
        <div className="w-full md:w-[45%] flex gap-2 items-center ">
          <input
            id="skills"
            placeholder="Enter Skills"
            className={inputClass}
            onKeyDown={handleSkillEnter}
            onChange={(e)=>setSkill(e.target.value)}
            value={skill}
          />
          <div onClick={handleSkills} className="bg-gray-800 text-white rounded-md px-3 py-2 font-bold">Add</div>
        </div>
          <div className="flex flex-wrap gap-2  md:w-full ">
            {state.skills.map((skill,index) => (
              <div className="flex gap-3 bg-gray-700/100 px-3 py-2 rounded-md">
                <div className="text-sm" key={index}>{skill}</div>
                <div className="font-bold text-sm cursor-pointer" onClick={()=>removeSkill(index)}>X</div>
                </div>
            ))}
          </div>
      </div>
      <div className="flex gap-5 mt-4">
        <div
          className="bg-red-500/100 size-fit px-5 py-2 rounded-sm cursor-pointer"
          onClick={handleSubmit}
        >
          Save Changes
        </div>
        <div className="bg-gray-500/100 size-fit px-5 py-2 rounded-sm cursor-pointer">
          Cancel
        </div>
      </div>
    </div>
  );
}

export default Profile;
