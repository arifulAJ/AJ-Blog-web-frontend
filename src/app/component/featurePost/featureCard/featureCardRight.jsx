import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const MAX_BODY_LENGTH = 300;
const FeatureCardRight = (article) => {
  const [showFullBody, setShowFullBody] = useState(false);

  const toggleBodyDisplay = () => {
    setShowFullBody(!showFullBody);
  };
  return (
    <div className="border md:p-6 p-2 m-1 rounded-2xl align-middle justify-center hover:border-button-color duration-700">
      <Link href={`/article/${article._id}`}>
        <div>
          <Image
            className="rounded-2xl"
            src={article.cover}
            width={800}
            height={100}
            alt={`${article.tags} images`}
          />
          <div className="py-4 px-1">
            <button className="border capitalize sm:font-semibold border-button-color rounded-full px-2 py-0 mb-4">
              {article.tags}
            </button>
            <h2 className=" font-semibold">Title: {article.title}</h2>
            <p>
              <span className="font-semibold">Article: </span>
              {showFullBody
                ? article.body
                : article.body.slice(0, MAX_BODY_LENGTH)}
              {article.body.length > MAX_BODY_LENGTH && (
                <button
                  className="text-button-color font-semibold"
                  onClick={toggleBodyDisplay}
                >
                  {showFullBody ? " ..Read Less" : " ..Read More"}
                </button>
              )}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeatureCardRight;
