"use client";
import React, { useEffect, useState } from "react"; // Import necessary React modules
import getArticleNOQuary from "../component/libs/getArticleNOQuary";
import Link from "next/link";
import Image from "next/image";

const ShowArticleTags = () => {
  const [tagCounts, setTagCounts] = useState({}); // Use state to store tag counts
  const [coverImages, setCoverImages] = useState({});

  useEffect(() => {
    const fetchArticleTags = async () => {
      const allArticle = await getArticleNOQuary();

      // Create an object to store tag counts and cover images
      const counts = {};
      const covers = {};

      // Iterate through the articles and count tags and associate cover images
      allArticle.forEach((article) => {
        const tags = article.tags.split(",").map((tag) => tag.trim());

        // Count tags
        tags.forEach((tag) => {
          if (counts[tag]) {
            counts[tag]++;
          } else {
            counts[tag] = 1;
          }
        });

        // Associate cover image with each tag
        tags.forEach((tag) => {
          if (!covers[tag]) {
            covers[tag] = article.cover; // Assuming article has a 'cover' property
          }
        });
      });

      setTagCounts(counts);
      setCoverImages(covers);
    };

    fetchArticleTags(); // Fetch and count tags when the component mounts
  }, []);

  return (
    <div className="md:px-32 sm:px-12 md:py-1">
      <h1 className="text-center font-semibold text-3xl sm:text-4xl py-8">
        Articles Filtered by Tag
      </h1>

      <div className="grid  md:grid-cols-3 sm:grid-cols-2 gap-4 py-12 sm:py-16">
        {Object.keys(tagCounts).map((tag) => (
          <div
            key={tag}
            className="grid border bg-hover-effect rounded transition  ease-linear transform hover:bg-opacity-20 hover:cursor-pointer hover:backdrop-blur-lg"
          >
            <Link href={`/tags/${tag}`}>
              <div>
                <Image
                  className="rounded"
                  src={coverImages[tag] || "default-cover-image-url"} // Use cover image for the tag, or a default image
                  alt={tag}
                  width={600}
                  height={400}
                />
              </div>
              <div className="flex text-2xl justify-between p-4  ">
                <h1 className="font-semibold">{tag}</h1>
                <p>Post: {tagCounts[tag]} </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowArticleTags;
