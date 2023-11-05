"use client";

import React, { useEffect, useState, useRef } from "react";
import { getCommentByQuery } from "../../libs/getCommentByQuery";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment, FaShare } from "react-icons/fa";
import CommentCard from "./commentCard";
import CommentInput from "./createComment";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
} from "react-share";
import { usePathname } from "next/navigation";

const ShowComments = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [isCommentInputVisible, setCommentInputVisible] = useState(false);
  const [coutnCommetn, setCountComment] = useState({});
  const [limit, setLimit] = useState(5);
  const [shareDialogVisible, setShareDialogVisible] = useState(false);
  const dialogRef = useRef(null);
  const currentUrl = usePathname();

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
  }, [id, limit]);
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
          <button className="bg-button-color p-1 text-white rounded-full flex items-center">
            <AiFillLike />
          </button>{" "}
          2
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
          <button className="py-2 sm:px-4 flex items-center hover-bg-gray-200 rounded">
            <AiOutlineLike />
            Like
          </button>
          <button
            onClick={toggleCommentInput}
            className="py-2 px-4 flex items-center hover-bg-gray-200 rounded"
          >
            <FaRegComment />
            Comment
          </button>
          <button
            onClick={() => setShareDialogVisible(true)} // Show the share dialog
            className="py-2 px-4 flex items-center hover:bg-gray-200 rounded"
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
                  <FacebookShareButton url={currentUrl} beforeShare={sharePage}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={currentUrl} beforeShare={sharePage}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <EmailShareButton url={currentUrl} beforeShare={sharePage}>
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                  <LinkedinShareButton url={currentUrl} beforeShare={sharePage}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
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
          view more comments
        </button>
      </div>
      {comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
      {isCommentInputVisible && <CommentInput id={id} />}
    </div>
  );
};

export default ShowComments;
