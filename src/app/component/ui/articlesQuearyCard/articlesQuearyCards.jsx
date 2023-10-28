import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegCommentAlt } from "react-icons/fa";

const ArticleQuearyCard = ({ article }) => {
  const { title, body, cover, author, tags, _id } = article;

  return (
    <div className=" border rounded-2xl hover:border-s-sky-700 hover:border-r-2 hover:rounded-none hover:border-button-color hover:bg-slate-50 duration-500">
      <Link href={`article/${_id}`}>
        <div className="p-2  ">
          <Image
            className="rounded-2xl hover:rounded-none fill-hover-effect duration-700"
            src={cover}
            width={600}
            height={200}
            alt={`${tags} image is not found`}
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
        </div>
      </Link>
    </div>
  );
};

export default ArticleQuearyCard;
