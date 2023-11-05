"use client";
import React, { useState, useEffect } from "react";
import getUseById from "../../libs/getUseById";

const CommentCard = ({ comment }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUseById(comment.authorId);
      setUser(userData);
    };

    if (!user) {
      fetchUser();
    }
  }, [comment.authorId, user]);

  return (
    <div className="py-2 px-4">
      {user ? (
        <div className="flex ">
          <div className="">
            <img
              className="rounded-full "
              src={
                user.avatar ||
                "https://res.cloudinary.com/arifulislam/image/upload/v1698799492/avatar-default-symbolic-icon-2048x1949-pq9uiebg_mizdd3.png"
              }
              height="40px"
              width="40px"
              alt="User Avatar"
            />
          </div>
          <div className="border rounded-2xl bg-slate-100 px-2 py-1 ml-2">
            <p className="font-semibold pb-1">{user.name}</p>
            <p>{comment.body}</p>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default CommentCard;
