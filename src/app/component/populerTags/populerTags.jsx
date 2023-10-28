"use client";
import Link from "next/link";
import getArticleNOQuary from "../libs/getArticleNOQuary";
import { useEffect, useState } from "react";

const PopulerTags = () => {
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
      <h1 className="text-center font-semibold text-xl sm:text-2xl">
        Popular Tags
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 py-12 sm:py-16">
        {Object.keys(tagCounts).map((tag) => (
          <Link href={`/tags/${tag}`}>
            <div
              key={tag}
              className="grid grid-cols-2 px-4 mx-16 sm:mx-2 border rounded-full"
            >
              <img
                className="rounded-full w-14 h-14"
                src={coverImages[tag] || "default-image-url"}
                alt={tag}
              />
              <div>
                <h1 className="font-semibold">{tag}</h1>
                <p>{tagCounts[tag]} posts</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopulerTags;
