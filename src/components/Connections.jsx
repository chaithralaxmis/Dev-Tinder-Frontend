import { useEffect, useState } from "react";
import { getConnections } from "../utility/apiFunction";

function Connections() {
  const [connections, setConnections] = useState([]);
  useEffect(() => {
    getConnectionData();
  }, []);

  const getConnectionData = async () => {
    const res = await getConnections();
    if (res.status == 200) {
      setConnections(res.data.data);
    }
  };
  return (
    <div className="flex-1 p-5">
      <div className="bg-gray-800 md:block p-3 rounded-sm w-full flex">
        Connections
      </div>
       {connections.map((data) => (
        <div
          key={data._id}
          className="bg-gray-800 p-2 rounded-sm flex flex-col md:flex-row justify-between items-center mt-4 rounded-sm"
        >
          <div className="flex gap-3">
            <img className="rounded-sm h-20 " src={data.photoURL} />
            <div>
              <div className="font-bold text-xl">
                {data.firstName + data.lastName}
              </div>
              <div className="font-bold text-md">
                {data.designation}
              </div>
              <div className="flex gap-2">
                {data.skills.map((skill, index) => (
                  <div key={index + skill}>{skill}</div>
                ))}
              </div>
            </div>
          </div>
         
        </div>
      ))}
    </div>
  );
}

export default Connections;
