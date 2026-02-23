import { useEffect, useState } from "react";
import { getRequests, repondToRequest } from "../utility/apiFunction";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  useEffect(() => {
    getRequestsData("recieved");
  }, []);
  const getRequestsData = async (type) => {
    try {
      setSelectedTab(type);
      const res = await getRequests(type);
      if (res.status == 200) {
        console.log(res.data.data);
        setRequests(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRequest = async(data) =>{
    try {
      const res = await repondToRequest(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex-1 p-5">
      <div className="font-bold text-2xl md:hidden flex items-center justify-center mb-3">
        <img
          src="../../../public/assets/fire-svgrepo-com.svg"
          className="w-10"
        />
        Dev Tinder
      </div>
      <div className="bg-gray-800 md:block p-3 rounded-sm w-full flex">
        <div className="p-2 cursor-pointer" onClick={() => getRequestsData("recieved")}>
          Incoming
        </div>
        <div className="p-2 cursor-pointer" onClick={() => getRequestsData("sent")}>
          Sent
        </div>
      </div>
      {requests.map((data) => (
        <div
          key={data._id}
          className="bg-gray-800 p-2 rounded-sm flex flex-col md:flex-row justify-between items-center mt-4 rounded-sm"
        >
          <div className="flex gap-3">
            <img className="rounded-sm h-20 " src={data.fromUserID.photoURL} />
            <div>
              <div className="font-bold text-xl">
                {data.fromUserID.firstName + data.fromUserID.lastName}
              </div>
              <div className="font-bold text-md">
                {data.fromUserID.designation} | {data.fromUserID.yearOfExp} Years 
              </div>
              <div className="flex gap-2">
                {data.fromUserID.skills.map((skill, index) => (
                  <div key={index + skill}>{skill}</div>
                ))}
              </div>
            </div>
          </div>
          {selectedTab == "recieved" && (
            <div className="flex gap-2 items-center self-end">
              <div className="bg-red-500 px-5 py-1 size-fit rounded-sm font-semibold hover:bg-red-700 cursor-pointer" onClick={()=>handleRequest({status:"rejected",requestID:data._id})}>
                Reject
              </div>
              <div className="bg-green-500 px-5 py-1 size-fit rounded-sm font-semibold hover:bg-green-700 cursor-pointer" onClick={()=>handleRequest({status:"accepted",requestID:data._id})}>
                Accept
              </div>
            </div>
          )}
          {
            selectedTab === 'sent' && (
              <div className="px-3 py-1 bg-cyan-700 text-white flex self-end rounded-full font-sm">Request pending !</div>
            )
          }
        </div>
      ))}
    </div>
  );
}

export default Requests;
