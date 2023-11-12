// import React, { useState, useEffect } from "react";
// import LikesCard from "./likesCard";
// import { AiTwotoneLike } from "react-icons/ai";
// const ShowLikes = () => {
//   const [likes, setLikes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const articleId = "6541b1da31ec6488526a3c5b";
//   useEffect(() => {
//     const fetchLikes = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/api/v1/likes/${articleId}`,
//           { cache: "no-cache" }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setLikes(data); // Assuming the API response is an array of likes
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching likes:", error);
//         setLoading(false);
//       }
//     };

//     fetchLikes();
//   }, [articleId]);

//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : likes.length === 0 ? (
//         <p>No likes found.</p>
//       ) : (
//         <div>
//           <button onClick={showUser} className="flex items-center text-xl">
//             <AiTwotoneLike className="text-blue-800" />
//             {likes.length}
//           </button>
//           {likes.map((like) => (
//             <LikesCard key={like._id} like={like} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShowLikes;
// import React, { useState, useEffect } from "react";
// import LikesCard from "./likesCard";
// import {
//   AiTwotoneLike,
//   AiCloseCircle,
//   AiFillCloseCircle,
// } from "react-icons/ai";
// const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
// const ShowLikes = ({ id, parentLikeCount }) => {
//   const [likes, setLikes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showUserPopup, setShowUserPopup] = useState(false); // State for showing user popup
//   const [selectedUser, setSelectedUser] = useState(null); // State for the selected user

//   const articleId = id;

//   useEffect(() => {
//     const fetchLikes = async () => {
//       try {
//         const response = await fetch(`${baseurl}/api/v1/likes/${articleId}`, {
//           cache: "no-cache",
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log(data);
//         setLikes(data); // Assuming the API response is an array of likes
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching likes:", error);
//         setLoading(false);
//       }
//     };

//     fetchLikes();
//   }, [articleId, parentLikeCount]);

//   const showUser = (user) => {
//     setSelectedUser(user);
//     setShowUserPopup(true);
//   };

//   const closeUserPopup = () => {
//     setSelectedUser(null);
//     setShowUserPopup(false);
//   };

//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : likes.length === 0 ? (
//         ""
//       ) : (
//         <div>
//           <button
//             onClick={() => showUser(likes[0])} // Show user popup for the first like (you can change this as needed)
//             className="flex items-center text-xl"
//           >
//             <AiTwotoneLike className="text-blue-800 text-2xl rounded" />
//             {likes.length}
//           </button>
//         </div>
//       )}

//       {showUserPopup && (
//         <div className="user-popup">
//           <AiFillCloseCircle
//             className="close-button"
//             onClick={closeUserPopup}
//           />

//           {likes.map((like) => (
//             <LikesCard key={like._id} like={like} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShowLikes;
// import React, { useState, useEffect } from "react";
// import LikesCard from "./likesCard";
// import { AiTwotoneLike, AiFillCloseCircle } from "react-icons/ai";

// const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

// const ShowLikes = ({ id, parentLikeCount }) => {
//   const [likes, setLikes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showUserPopup, setShowUserPopup] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const articleId = id;

//   useEffect(() => {
//     const fetchLikes = async () => {
//       try {
//         const response = await fetch(`${baseurl}/api/v1/likes/${articleId}`, {
//           cache: "no-cache",
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setLikes(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching likes:", error);
//         setLoading(false);
//       }
//     };

//     fetchLikes();
//   }, [articleId, parentLikeCount]);

//   const showUser = (user) => {
//     setSelectedUser(user);
//     setShowUserPopup(true);
//   };

//   const closeUserPopup = () => {
//     setSelectedUser(null);
//     setShowUserPopup(false);
//   };

//   return (
//     // <div>
//     //   {loading ? (
//     //     <p>Loading...</p>
//     //   ) : likes.length === 0 ? (
//     //     ""
//     //   ) : (
//     //     <div>
//     //       <button
//     //         onClick={() => showUser(likes[0])}
//     //         className="flex items-center text-xl"
//     //       >
//     //         <AiTwotoneLike className="text-blue-800 text-2xl rounded" />
//     //         {likes.length}
//     //       </button>
//     //     </div>
//     //   )}

//     //   {showUserPopup && (
//     //     <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 z-50 rounded-lg shadow-lg w-1/2 max-h-1/2 overflow-y-auto backdrop-blur-md">
//     //       <AiFillCloseCircle
//     //         className="absolute top-4 right-4 text-gray-600 cursor-pointer"
//     //         onClick={closeUserPopup}
//     //       />

//     //       {likes.map((like) => (
//     //         <LikesCard key={like._id} like={like} />
//     //       ))}
//     //     </div>
//     //   )}
//     // </div>
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : likes.length === 0 ? (
//         ""
//       ) : (
//         <div>
//           <button
//             onClick={() => setShowUserPopup(true)}
//             className="flex items-center text-xl"
//           >
//             <AiTwotoneLike className="text-blue-800 text-2xl rounded" />
//             {likes.length}
//           </button>
//         </div>
//       )}

//       {showUserPopup && (
//         <div className="fixed top-1/2 left-1/2 transform border -translate-x-1/2 -translate-y-1/2 bg-white p-8 z-50 rounded-lg shadow-lg w-full sm:w-5/6 md:w-1/2 lg:w-2/3 xl:w-1/2 max-h-1/2 overflow-y-scroll backdrop-blur-md">
//           <AiFillCloseCircle
//             className="absolute top-4 right-4 text-gray-600 cursor-pointer"
//             onClick={() => setShowUserPopup(false)}
//           />

//           {likes.map((like) => (
//             <LikesCard key={like._id} like={like} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShowLikes;
import React, { useState, useEffect, useRef } from "react";
import LikesCard from "./likesCard";
import { AiTwotoneLike, AiFillCloseCircle } from "react-icons/ai";
import ReactDOM from "react-dom";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

const ShowLikes = ({ id, parentLikeCount }) => {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const popupRef = useRef(null);

  const articleId = id;

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(`${baseurl}/api/v1/likes/${articleId}`, {
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setLikes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching likes:", error);
        setLoading(false);
      }
    };

    fetchLikes();
  }, [articleId, parentLikeCount]);

  const showUser = (user) => {
    setSelectedUser(user);
    setShowUserPopup(true);
  };

  const closeUserPopup = () => {
    setSelectedUser(null);
    setShowUserPopup(false);
  };

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closeUserPopup();
    }
  };

  useEffect(() => {
    if (showUserPopup) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showUserPopup]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : likes.length === 0 ? (
        ""
      ) : (
        <div>
          <button
            onClick={() => setShowUserPopup(true)}
            className="flex items-center text-xl"
          >
            <AiTwotoneLike className="text-blue-800 text-2xl rounded" />
            {likes.length}
          </button>
        </div>
      )}

      {showUserPopup &&
        ReactDOM.createPortal(
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 z-50 rounded-lg shadow-lg w-full sm:w-5/6 md:w-1/2 lg:w-2/3 xl:w-1/2 max-h-1/2 overflow-y-scroll backdrop-blur-md"
            ref={popupRef}
          >
            <AiFillCloseCircle
              className="absolute top-4 right-2 text-blue-800 cursor-pointer text-3xl font-bold"
              onClick={closeUserPopup}
            />

            {likes.map((like) => (
              <LikesCard key={like._id} like={like} />
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};

export default ShowLikes;
