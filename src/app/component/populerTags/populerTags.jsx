"use client";

import Link from "next/link";
import getArticleNOQuary from "../libs/getArticleNOQuary";
import { useEffect, useState } from "react";
import Image from "next/image";

const PopulerTags = () => {
  const [tagCounts, setTagCounts] = useState({});
  const [coverImages, setCoverImages] = useState({});

  useEffect(() => {
    const fetchArticleTags = async () => {
      const allArticles = await getArticleNOQuary();

      const counts = {};
      const covers = {};

      allArticles.forEach((article) => {
        const tags = article.tags.split(",").map((tag) => tag.trim());

        tags.forEach((tag) => {
          if (counts[tag]) {
            counts[tag]++;
          } else {
            counts[tag] = 1;
          }
          if (!covers[tag]) {
            covers[tag] = article.cover;
          }
        });
      });

      // Sort tags by their counts in descending order
      const sortedTags = Object.keys(counts).sort(
        (a, b) => counts[b] - counts[a]
      );

      // Select the top four tags
      const topTags = sortedTags.slice(0, 4);

      // Create new objects with the top tags and their cover images
      const topTagCounts = {};
      const topCoverImages = {};
      topTags.forEach((tag) => {
        topTagCounts[tag] = counts[tag];
        topCoverImages[tag] = covers[tag];
      });

      setTagCounts(topTagCounts);
      setCoverImages(topCoverImages);
    };

    fetchArticleTags();
  }, []);

  return (
    <div className="md:px-32 sm:px-12 md:py-1">
      <h1 className="text-center font-semibold text-xl sm:text-2xl">
        Popular Tags
      </h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 py-12 sm:py-16">
        {Object.keys(tagCounts).map((tag) => (
          <div key={tag} className="grid grid-col sm:mx-2 border rounded-full">
            <Link
              href={`/tags/${tag}`}
              className="flex items-center  justify-around "
            >
              <div>
                <Image
                  className="rounded-full border-2 w-20 h-20"
                  src={coverImages[tag]}
                  width={300}
                  height={200}
                  alt={tag}
                />
              </div>
              <div className="ml-4 ">
                <h1 className="font-semibold">{tag}</h1>
                <p>Posts: {tagCounts[tag]} </p>
              </div>
            </Link>
          </div>
        ))}
        <Link
          href={"/tags"}
          className="flex items-center border rounded-full  justify-around "
        >
          <div className="rounded-full border-2 w-20 h-20 overflow-hidden">
            <Image
              src={"/pngegg.png"}
              width={300}
              height={200}
              alt={"tags logo"}
            />
          </div>
          <div className="ml-4  ">
            <h1 className="font-semibold">Explore more Tags +</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PopulerTags;
