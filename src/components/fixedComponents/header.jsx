import { FaHandHoldingHeart, FaHeart } from "react-icons/fa"
import { IoPerson } from "react-icons/io5"
import { useNavigate } from "react-router"

function Header(){
    const navigate = useNavigate()
     const goToFeed = () =>{
    navigate("/feed")
  }
   const goToRequests= () =>{
    navigate("/requests")
  }
   const goToProfile = () =>{
    navigate("/profile")
  }
    return(
        <nav className="" >
           <ul className="flex flex-row justify-around md:justify-between p-3 bg-gray-800">
            <li className="flex items-center justify-center gap-2 hidden md:flex">
                <img src="../../../public/assets/fire-svgrepo-com.svg" className="w-10"/>
                Dev Tinder
            </li>
            <li className="flex items-center cursor-pointer gap-2 text-gray-300 font-semibold" onClick={goToFeed}>
                <FaHeart className="fill-gray-400"/>
                Feed
            </li>
            <li className="flex items-center cursor-pointer gap-2 text-gray-300 font-semibold" onClick={goToRequests}>
                <FaHandHoldingHeart />
                Requests
            </li>
            <li className="flex items-center cursor-pointer gap-2 text-gray-300 font-semibold" onClick={goToProfile}>
                <IoPerson />
                Profile
            </li>
           </ul>
        </nav>
    )
}

export default Header