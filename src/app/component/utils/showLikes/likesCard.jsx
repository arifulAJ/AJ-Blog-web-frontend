import React from "react";
import getUseById from "../../libs/getUseById";

const LikesCard = async (props) => {
  const like = props.like;

  const author = await getUseById(like.authorId);

  return (
    <div className="border rounded bg-slate-100">
      <div className="flex items-center justify-between px-4">
        <img
          className="w-12 h-12 rounded-full "
          src={author.avatar}
          alt="userAvater"
        />
        <h1 className="font-semibold ">{author.name}</h1>
      </div>
    </div>
  );
};

export default LikesCard;
