// import React, { useState } from "react";
// import axios from "axios";
// import { getTokenFromServer } from "../tokenvarifay/tokenApi";
// import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
// const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
// const CreateLikes = ({ id, onLikeCountUpdate }) => {
//   const [showEmojis, setShowEmojis] = useState(false); // State to show/hide emojis
//   const [selectedEmoji, setSelectedEmoji] = useState(""); // State to store the selected emoji

//   const handleEmojiClick = (emoji) => {
//     setSelectedEmoji(emoji);
//     // Hide emojis after selection
//   };
//   console.log(showEmojis);
//   const handleLikeSubmit = async () => {
//     if (!selectedEmoji) {
//       // You can add validation to ensure an emoji is selected
//       return;
//     }
//     // Pass the article ID as a prop
//     const authorizationHeader = await getTokenFromServer(); // Set your authorization header

//     try {
//       const response = await fetch(`${baseurl}/api/v1/likes/${id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${authorizationHeader}`,
//         },
//         cache: "no-cache",
//         body: JSON.stringify({ body: selectedEmoji }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         switch (data.code) {
//           case 201:
//             setShowEmojis(true);
//             onLikeCountUpdate(1);

//             break;
//           case 200:
//             setShowEmojis(false);
//             onLikeCountUpdate(0);
//             break;
//           // Add more cases as needed
//           default:
//           // Handle unexpected response codes here
//         }
//         // Handle the response, e.g., show a success message or update the UI
//       } else {
//         // Handle non-2xx HTTP responses (e.g., network errors or server errors)
//         console.error(
//           "Error creating like:",
//           response.status,
//           response.statusText
//         );
//       }
//     } catch (error) {
//       // Handle any errors, e.g., display an error message
//       console.error("Error creating like:", error);
//     }
//   };

//   return (
//     <div className="relative inline-block" onClick={handleLikeSubmit}>
//       {!showEmojis ? (
//         <button
//           onClick={() => handleEmojiClick("like")}
//           className="py-2 sm:px-4 flex items-center sm:text-xl hover:bg-gray-200 rounded"
//         >
//           <AiOutlineLike /> Like
//         </button>
//       ) : (
//         <button
//           onClick={() => handleEmojiClick("like")}
//           className="py-2 sm:px-4 flex text-blue-700 sm:text-xl items-center hover:bg-gray-200 rounded"
//         >
//           <AiTwotoneLike /> Like
//         </button>
//       )}
//     </div>
//   );
// };

// export default CreateLikes;
import React, { useState, useEffect } from "react";

import { getTokenFromServer } from "../tokenvarifay/tokenApi";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

const CreateLikes = ({ id, onLikeCountUpdate }) => {
  const [showEmojis, setShowEmojis] = useState(false); // State to show/hide emojis
  const [selectedEmoji, setSelectedEmoji] = useState(""); // State to store the selected emoji
  const [isLiked, setIsLiked] = useState(false); // State to track whether the content is liked

  useEffect(() => {
    // Check if the content is liked by retrieving the liked status from local storage
    const likedStatus = localStorage.getItem(`liked_${id}`);
    if (likedStatus === "true") {
      setIsLiked(true);
      setShowEmojis(true);
    }
  }, [id]);

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleLikeSubmit = async () => {
    if (!selectedEmoji) {
      return;
    }

    const authorizationHeader = await getTokenFromServer();

    try {
      const response = await fetch(`${baseurl}/api/v1/likes/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorizationHeader}`,
        },
        cache: "no-cache",
        body: JSON.stringify({ body: selectedEmoji }),
      });

      if (response.ok) {
        const data = await response.json();
        switch (data.code) {
          case 201:
            setShowEmojis(true);
            setIsLiked(true);
            onLikeCountUpdate(1);
            // Save liked status to local storage
            localStorage.setItem(`liked_${id}`, "true");
            break;
          case 200:
            setShowEmojis(false);
            setIsLiked(false);
            onLikeCountUpdate(0);
            // Remove liked status from local storage
            localStorage.removeItem(`liked_${id}`);
            break;
          default:
          // Handle unexpected response codes here
        }
      } else {
        console.error(
          "Error creating like:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error creating like:", error);
    }
  };

  return (
    <div className="relative inline-block">
      {!showEmojis ? (
        <div
          onClick={handleLikeSubmit}
          className={`py-2 sm:px-4 flex items-center sm:text-xl hover:bg-gray-200 rounded ${
            isLiked ? "text-blue-700" : ""
          }`}
        >
          <button
            className="flex items-center"
            onClick={() => handleEmojiClick("like")}
          >
            <AiOutlineLike /> Like
          </button>
        </div>
      ) : (
        <div
          onClick={handleLikeSubmit}
          className={`py-2 sm:px-4 flex text-blue-700 sm:text-xl items-center hover:bg-gray-200 rounded`}
        >
          <button
            className="flex items-center"
            onClick={() => handleEmojiClick("like")}
          >
            <AiTwotoneLike /> Like
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateLikes;
