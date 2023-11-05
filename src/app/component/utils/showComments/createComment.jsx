import React, { useState } from "react";
import { getTokenFromServer } from "../tokenvarifay/tokenApi";
const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
const CommentInput = ({ id }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getTokenFromServer();

    const apiUrl = `${baseurl}/api/v1/comments/${id}`; // Replace with your API URL

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body: comment }),
      });

      if (response.ok) {
        console.log("Comment posted successfully.");
        setComment(""); // Clear the input field
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
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Write your comment..."
          value={comment}
          onChange={handleCommentChange}
          aria-label="Comment Input"
        ></textarea>
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

export default CommentInput;
