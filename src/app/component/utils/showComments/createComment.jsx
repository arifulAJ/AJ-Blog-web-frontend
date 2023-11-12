import React, { useState, useEffect, useRef } from "react";
import { getTokenFromServer } from "../tokenvarifay/tokenApi";
import toast from "react-hot-toast";

import withPrivateRoute from "../privetRoute/privetRoute";
const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

const CommentInput = ({ id, onClose, onCommentUpdate }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(""); // Add an error state

  const commentInputRef = useRef(null);

  useEffect(() => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    // Clear the error message when the input changes
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getTokenFromServer();

    // Validate the input length
    if (comment.length < 2) {
      setError("Comment must be at least 2 characters.");
      return; // Prevent submitting if the input is invalid
    }

    const apiUrl = `${baseurl}/api/v1/comments/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body: comment }),
        cache: "no-cache",
      });
      const res = await response.json();
      console.log(res.newComment.createdAt);
      if (response.ok) {
        toast.success("Created successfully");

        setComment("");
        onClose();
        onCommentUpdate(res.newComment.createdAt);
        // window.location.reload();
      } else {
        console.error("Failed to post comment.");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <form onSubmit={handleSubmit}>
        <label htmlFor="commentInput" className="sr-only">
          Comment
        </label>
        <textarea
          id="commentInput"
          name="comment"
          ref={commentInputRef}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Write your comment..."
          value={comment}
          onChange={handleCommentChange}
          aria-label="Comment Input"
        ></textarea>
        {error && <div className="text-red-500 mt-2">{error}</div>}{" "}
        {/* Display error message */}
        <button
          className="mt-2 bg-button-color text-white px-4 py-2 rounded-lg"
          type="submit"
          aria-label="Post Comment"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default withPrivateRoute(CommentInput);
