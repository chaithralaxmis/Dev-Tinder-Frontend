import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { getFeed, respondToFeed } from "../utility/apiFunction";
import TinderCard from "react-tinder-card";
function Feed() {
  const [feeds, setFeeds] = useState([]);
  const getUserFeeds = async () => {
    const res = await getFeed();
    console.log(res.data.data);
    // if(res.status==200){
    setFeeds(res.data.data);
    // }
  };

  useEffect(() => {
    getUserFeeds();
  }, []);

  const onSwipe = (direction, data) => {
    console.log("You swiped: " + direction, data);
    setTimeout(() => {
      setFeeds((prevFeeds) =>
        prevFeeds.filter((item) => item._id !== data._id),
      );
    }, 300);
    let type = direction === "left" ? "ignored" : "interested";
    sendRequest({ type: type, data: data });
  };

  const sendRequest = async (data) => {
    console.log(data);
    const res = await respondToFeed({
      status: data.type,
      toUserID: data.data._id,
    });
    if (res) {
      setTimeout(() => {
        setFeeds((prevFeeds) =>
          prevFeeds.filter((item) => item._id !== data._id),
        );
      }, 200);
    }
  };
  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="relative w-80 h-[450px]">
        {feeds
          .slice(0, 3)
          .reverse()
          .map((data, index) => (
            <TinderCard
              key={data._id}
              onSwipe={(dir) => onSwipe(dir, data)}
              preventSwipe={["up", "down"]}
              swipeThreshold={10} // Tuning threshold for better sensitivity
              flickOnSwipe={true} // Ensure card flies off screen
              className="absolute w-full h-full"
              swipeRequirementType="position" // Flicking triggers it easily
              style={{ zIndex: index }}
            >
              <div className="w-full h-full bg-gray-800 rounded-2xl overflow-hidden shadow-lg p-4">
                {/* Image Section */}
                  <img
                    src={data.photoURL ? data.photoURL : ("../../public/assets/default.png")}
                    alt={data.firstName}
                    className="w-[120px] h-[120px] object-cover rounded-full place-self-center"
                  />

                {/* Content Section */}
                <div className="text-white">
                  <div className="font-bold text-2xl">
                      {data.firstName + " " + data.lastName}
                    </div>

                    <div className="text-lg text-gray-300">
                      {data.designation ? data.designation : 'Not Specified'}
                    </div>
                    <div className="text-lg text-gray-300">
                      Experience - {data.yearOfExp ? data.yearOfExp + 'Years' : 'Not Specified'} 
                    </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {data.skills.slice(0, 6).map((skill, i) => (
                      <span
                        key={i}
                        className="bg-gray-700 px-2 py-1 rounded-md text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                    {data.skills.length > 6 && (
                      <span>+ {data.skills.length - 6} more</span>
                    )}
                  </div>

                  <div className="mt-3 text-gray-400 text-sm">{data.about}</div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-10 p-4">
                  <div
                    className="bg-red-500 w-14 h-14 rounded-full flex justify-center items-center hover:bg-red-700 cursor-pointer transition pressable"
                    onClick={() => onSwipe("left", data)}
                  >
                    <ImCross />
                  </div>

                  <div
                    className="bg-green-500 w-14 h-14 rounded-full flex justify-center items-center hover:bg-green-700 cursor-pointer transition pressable"
                    onClick={() => onSwipe("right", data)}
                  >
                    <FaCheck />
                  </div>
                </div>
              </div>
            </TinderCard>
          ))}
      </div>
    </div>
  );
}

export default Feed;
