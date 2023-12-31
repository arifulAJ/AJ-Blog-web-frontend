import Image from "next/image";
import Link from "next/link";
import React from "react";

// Define an interface for the article props

const FeatureCard = (article) => {
  // Check if the cover is a valid URL
  const coverURL = article.cover;

  function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <Link href={`/article/${article._id}`}>
      <div className="flex flex-col sm:flex-row my-2 py-2 px-2 rounded-xl border hover:border-button-color duration-700 ">
        <div className=" h-36 w-60 mb-2 sm:mr-2 sm:mb-0 ">
          {isValidURL(coverURL) ? (
            <Image
              className=" rounded-2xl  "
              src={coverURL}
              width={606}
              height={168}
              alt={`${article.tags} Image`}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          ) : (
            // <img className="w-full h-200 sm:w-206 sm:h-165" src={coverURL}  alt={`${article.tags} Image`} />
            // <img src={coverURL} alt="" />
            <p>No valid cover image available</p>
          )}
        </div>
        <div className="py-2 px-4">
          <button className="border sm:font-semibold capitalize border-button-color rounded-full px-2 py-0 mb-4">
            {article.tags}
          </button>
          <h2 className="font-semibold">Title: {article.title}</h2>
          {/* Render other article details */}
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;
