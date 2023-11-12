"use client";

// import React, { useEffect, useState, useRef } from "react";
// import { getCommentByQuery } from "../../libs/getCommentByQuery";
// import { AiFillLike, AiOutlineLike } from "react-icons/ai";
// import { FaRegComment, FaShare } from "react-icons/fa";
// import CommentCard from "./commentCard";
// import CommentInput from "./createComment";
// import {
//   FacebookShareButton,
//   TwitterShareButton,
//   EmailShareButton,
//   LinkedinShareButton,
//   FacebookIcon,
//   TwitterIcon,
//   EmailIcon,
//   LinkedinIcon,
//   FacebookMessengerShareButton,
//   FacebookMessengerIcon,
// } from "react-share";
// import { usePathname } from "next/navigation";
// const baseurl = process.env.NEXT_PUBLIC_BASE_URL_OWN;
// const ShowComments = ({ id }) => {
//   const [comments, setComments] = useState([]);
//   const [isCommentInputVisible, setCommentInputVisible] = useState(false);
//   const [coutnCommetn, setCountComment] = useState({});
//   const [limit, setLimit] = useState(5);
//   const [shareDialogVisible, setShareDialogVisible] = useState(false);
//   const dialogRef = useRef(null);
//   const currentUrl = usePathname();
//   const URL = `${baseurl}${currentUrl}`;

//   const toggleCommentInput = () => {
//     setCommentInputVisible(!isCommentInputVisible);
//   };

//   const allComment = async () => {
//     setLimit(coutnCommetn.totalItems);
//   };

//   const sharePage = () => {
//     // Share functionality here (e.g., using react-share)
//     // You can also handle success and close the dialog in this function
//     setShareDialogVisible(false); // Close the share dialog after sharing
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getCommentByQuery(id, limit);
//         setComments(response.allComment);
//         setCountComment(response.pagination);
//       } catch (error) {
//         console.error("Error fetching comments: ", error);
//       }
//     };
//     fetchData();
//   }, [id, limit]);
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dialogRef.current && !dialogRef.current.contains(event.target)) {
//         setShareDialogVisible(false);
//       }
//     }

//     if (shareDialogVisible) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [shareDialogVisible]);
//   return (
//     <div>
//       <div className="flex justify-between py-2 sm:px-4">
//         <div className="flex items-center">
//           <button className="bg-button-color p-1 text-white rounded-full flex items-center">
//             <AiFillLike />
//           </button>{" "}
//           2
//         </div>
//         <button
//           onClick={allComment}
//           title="See all comments"
//           className="flex items-center relative"
//         >
//           <FaRegComment /> {coutnCommetn.totalItems}
//         </button>
//       </div>
//       <div className="sm:px-4 font-semibold text-slate-700">
//         <hr />
//         <div className="flex justify-between">
//           <button className="py-2 sm:px-4 flex items-center hover-bg-gray-200 rounded">
//             <AiOutlineLike />
//             Like
//           </button>
//           <button
//             onClick={toggleCommentInput}
//             className="py-2 px-4 flex items-center hover-bg-gray-200 rounded"
//           >
//             <FaRegComment />
//             Comment
//           </button>
//           <button
//             onClick={() => setShareDialogVisible(true)} // Show the share dialog
//             className="py-2 px-4 flex items-center hover:bg-gray-200 rounded"
//           >
//             <FaShare />
//             Share
//           </button>

//           {shareDialogVisible && (
//             <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
//               <div
//                 ref={dialogRef}
//                 className="bg-white p-8 rounded-lg shadow-lg"
//               >
//                 <h2 className="text-2xl mb-4">Share this page</h2>
//                 <div className="flex space-x-4">
//                   <FacebookShareButton url={URL} beforeShare={sharePage}>
//                     <FacebookIcon size={32} round />
//                   </FacebookShareButton>
//                   <FacebookMessengerShareButton
//                     url={URL}
//                     beforeShare={sharePage}
//                   >
//                     <FacebookMessengerIcon size={32} round />
//                   </FacebookMessengerShareButton>
//                   <TwitterShareButton url={URL} beforeShare={sharePage}>
//                     <TwitterIcon size={32} round />
//                   </TwitterShareButton>
//                   <EmailShareButton url={URL} beforeShare={sharePage}>
//                     <EmailIcon size={32} round />
//                   </EmailShareButton>
//                   <LinkedinShareButton url={URL} beforeShare={sharePage}>
//                     <LinkedinIcon size={32} round />
//                   </LinkedinShareButton>
//                 </div>
//                 <button
//                   onClick={() => setShareDialogVisible(false)}
//                   className="mt-4 text-blue-500 hover:underline"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//         <hr />
//       </div>
//       <div>
//         <button
//           className="underline font-medium px-4 py-2"
//           disabled={coutnCommetn.totalItems + 5 <= limit}
//           onClick={() => setLimit(limit + 5)}
//         >
//           view more comments
//         </button>
//       </div>
//       {comments.map((comment) => (
//         <CommentCard key={comment._id} comment={comment} />
//       ))}
//       {isCommentInputVisible && (
//         <CommentInput onClose={() => setCommentInputVisible(false)} id={id} />
//       )}
//     </div>
//   );
// };

// export default ShowComments;
import React, { useEffect, useState, useRef } from "react";
import { getCommentByQuery } from "../../libs/getCommentByQuery";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment, FaShare } from "react-icons/fa";
import CommentCard from "./commentCard";
import CommentInput from "./createComment";
import CreateLikes from "../showLikes/createLikes";
import ShowLikes from "../showLikes/showLikes";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "react-share";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL_OWN;

const ShowComments = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [isCommentInputVisible, setCommentInputVisible] = useState(false);
  const [coutnCommetn, setCountComment] = useState({});
  const [limit, setLimit] = useState(5);
  const [shareDialogVisible, setShareDialogVisible] = useState(false);
  const dialogRef = useRef(null);
  const currentUrl = usePathname();
  const URL = `${baseurl}${currentUrl}`;
  const [parentLikeCount, setParentLikeCount] = useState(0);
  const [parentCommentCount, setParentCommentCount] = useState("");

  // Callback function to handle likeCount update from CreateLikes
  const handleLikeCountUpdate = (newLikeCount) => {
    setParentLikeCount(newLikeCount);
  };
  const handelCommentCountUpdate = (newComment) => {
    setParentCommentCount(newComment);
  };

  const toggleCommentInput = () => {
    setCommentInputVisible(!isCommentInputVisible);
  };

  const allComment = async () => {
    setLimit(coutnCommetn.totalItems);
  };

  const sharePage = () => {
    // Share functionality here (e.g., using react-share)
    // You can also handle success and close the dialog in this function
    setShareDialogVisible(false); // Close the share dialog after sharing
  };

  const copyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = URL;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    toast.success("copyed");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCommentByQuery(id, limit);
        setComments(response.allComment);
        setCountComment(response.pagination);
      } catch (error) {
        console.error("Error fetching comments: ", error);
      }
    };
    fetchData();
  }, [id, limit, parentCommentCount]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setShareDialogVisible(false);
      }
    }

    if (shareDialogVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shareDialogVisible]);

  return (
    <div>
      <div className="flex justify-between py-2 sm:px-4">
        <div className="flex items-center">
          <ShowLikes id={id} parentLikeCount={parentLikeCount} />
        </div>
        <button
          onClick={allComment}
          title="See all comments"
          className="flex items-center relative"
        >
          <FaRegComment /> {coutnCommetn.totalItems}
        </button>
      </div>
      <div className="sm:px-4 font-semibold text-slate-700">
        <hr />
        <div className="flex justify-between">
          <CreateLikes id={id} onLikeCountUpdate={handleLikeCountUpdate} />

          <button
            onClick={toggleCommentInput}
            className="py-2 px-4 flex items-center sm:text-xl hover:bg-gray-200 rounded"
          >
            <FaRegComment />
            Comment
          </button>
          <button
            onClick={() => setShareDialogVisible(true)} // Show the share dialog
            className="py-2 px-4 flex items-center sm:text-xl hover:bg-gray-200 rounded"
          >
            <FaShare />
            Share
          </button>

          {shareDialogVisible && (
            <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
              <div
                ref={dialogRef}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <h2 className="text-2xl mb-4">Share this page</h2>
                <div className="flex space-x-4">
                  <FacebookShareButton url={URL} beforeShare={sharePage}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <FacebookMessengerShareButton
                    url={URL}
                    beforeShare={sharePage}
                  >
                    <FacebookMessengerIcon size={32} round />
                  </FacebookMessengerShareButton>
                  <TwitterShareButton url={URL} beforeShare={sharePage}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <EmailShareButton url={URL} beforeShare={sharePage}>
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                  <LinkedinShareButton url={URL} beforeShare={sharePage}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </div>
                <div className="flex items-center px-1 border rounded-full my-2">
                  {/* <p className="hover:border overflow-hidden px-2 w-60">
                    {URL}
                  </p> */}
                  <div className="overflow-hidden px-1 w-40 sm:w-64 ">
                    <div
                      className="px-2  hover:border -mb-1 sm:-mb-4 "
                      style={{
                        whiteSpace: "nowrap",
                        overflowX: "auto",
                      }}
                    >
                      {URL}
                    </div>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="py-2 px-4 flex items-center bg-black text-white rounded-full hover:bg-gray-900 "
                  >
                    Copy
                  </button>
                </div>

                <button
                  onClick={() => setShareDialogVisible(false)}
                  className="mt-4 text-blue-500 hover:underline"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        <hr />
      </div>

      <div>
        <button
          className="underline font-medium px-4 py-2"
          disabled={coutnCommetn.totalItems + 5 <= limit}
          onClick={() => setLimit(limit + 5)}
        >
          View more comments
        </button>
      </div>
      {comments.map((comment) => (
        <CommentCard
          parentCommentCount={parentCommentCount}
          key={comment._id}
          comment={comment}
        />
      ))}

      {isCommentInputVisible && (
        <CommentInput
          onCommentUpdate={handelCommentCountUpdate}
          onClose={() => setCommentInputVisible(false)}
          id={id}
        />
      )}
    </div>
  );
};

export default ShowComments;
