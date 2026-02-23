import { Navigate, Outlet } from "react-router"
import Header from "./header"
import Sidebar from "./sidebar"

function ProtectedRoute({isAuthenticated}){
    return(
        isAuthenticated ? 
      <div className="flex flex-col-reverse md:flex-col h-screen">
          <Header className=""/> 
          <div className="flex flex-row h-full bg-[url(../../../../public/assets/background-img.png)] bg-cover bg-center bg-no-repeat ">
          <Sidebar/>
          <Outlet/> 
          </div>
      </div>
        : <Navigate to="/login" replace/>
    )
}

export default ProtectedRoute