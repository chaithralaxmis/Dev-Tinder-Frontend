import { FaHandHoldingHeart, FaHeart } from "react-icons/fa";
import { IoLogOut, IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router";
import { logout } from "../../utility/apiFunction";
import { GiThreeFriends } from "react-icons/gi";

function Sidebar() {
  const navigate = useNavigate();
  const goToFeed = () => {
    navigate("/feed");
  };
  const goToRequests = () => {
    navigate("/requests");
  };
  const goToProfile = () => {
    navigate("/profile");
  };
  const goToConnections = () => {
    navigate("/connections");
  };

  const clearCookies = () => {
    document.cookie =
      "token" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const handleLogout = async () => {
    await logout();
    clearCookies();

    navigate("/login");
  };

  return (
    <div className="hidden md:block w-64 backdrop-blur-sm md:top-16">
      <div
        className="flex items-center gap-2 text-gray-300 font-semibold text-center px-6 py-4 hover:bg-orange-600/50 cursor-pointer"
        onClick={goToFeed}
      >
        <FaHeart className="fill-gray-400" />
        Feed
      </div>
      <div
        className="flex items-center gap-2 text-gray-300 font-semibold text-center px-6 py-4 hover:bg-orange-600/50 cursor-pointer"
        onClick={goToRequests}
      >
        <FaHandHoldingHeart />
        Requests
      </div>
      <div
        className="flex items-center gap-2 text-gray-300 font-semibold text-center px-6 py-4 hover:bg-orange-600/50 cursor-pointer"
        onClick={goToProfile}
      >
        <IoPerson />
        Profile
      </div>
      <div
        className="flex items-center gap-2 text-gray-300 font-semibold text-center px-6 py-4 hover:bg-orange-600/50 cursor-pointer"
        onClick={goToConnections}
      >
        <GiThreeFriends />
        Connections
      </div>
      <div
        className="flex items-center gap-2 text-gray-300 font-semibold text-center px-6 py-4 hover:bg-orange-600/50 cursor-pointer"
        onClick={handleLogout}
      >
        <IoLogOut />
        Logout
      </div>
    </div>
  );
}

export default Sidebar;
