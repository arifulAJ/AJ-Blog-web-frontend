"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
const MAX_BODY_LENGTH = 100;
const LatestArticleCard = ({ article }) => {
  const { title, body, cover, author, tags, _id } = article;
  const [showFullBody, setShowFullBody] = useState(false);

  const toggleBodyDisplay = () => {
    setShowFullBody(!showFullBody);
  };
  return (
    <div className=" border rounded-2xl hover:rounded-none hover:border-button-color hover:bg-slate-50 duration-700">
      <Link href={`article/${_id}`}>
        <div className="p-2 h-60 overflow-hidden ">
          <Image
            className="rounded-2xl hover:rounded-none fill-hover-effect duration-700"
            src={cover}
            width={600}
            height={200}
            alt={`${tags} image is not found`}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
        <div className="flex justify-between   px-4 py-2 ">
          <button className="border sm:font-semibold capitalize border-button-color rounded-full px-2 py-0 mb-4">
            {tags}
          </button>

          <FaRegCommentAlt />
        </div>
        <div className="p-2">
          <h1 className="font-semibold">Title:{title}</h1>
          <p>
            <span className="font-semibold">Article: </span>
            {showFullBody ? body : body.slice(0, MAX_BODY_LENGTH)}
            {body.length > MAX_BODY_LENGTH && (
              <button
                className="text-button-color font-semibold"
                onClick={toggleBodyDisplay}
              >
                {showFullBody ? " ..Read Less" : " ..Read More"}
              </button>
            )}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default LatestArticleCard;
