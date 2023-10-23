"use client";

import React, { useState, useEffect } from "react";
import FeatureCard from "./featureCard/featureCard";
import FeatureCardRight from "./featureCard/featureCardRight";

const FeaturePostSection = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const apiUrl =
      "https://ar-blog-api.onrender.com/api/v1/articles?page=1&limit=20&sort_type=dec&sort_by=updatedAt";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Filter articles to ensure unique tags
        const uniqueTags = new Set();
        const uniqueArticles = [];

        data.articles.forEach((article) => {
          if (!uniqueTags.has(article.tags)) {
            uniqueTags.add(article.tags);
            uniqueArticles.push(article);
          }
        });

        setArticles(uniqueArticles);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  return (
    <div className="pl-2 md:px-32 py-16">
      <h1 className="text-center font-semibold text-xl sm:text-2xl">
        Feature Posts
      </h1>

      <div className="flex flex-col md:flex-row my-8 ">
        <div className="basis-1/2">
          {articles.slice(0, 5).map((article) => (
            <div key={article.id}>
              <FeatureCard {...article} />
            </div>
          ))}
        </div>
        <div className="basis-1/2">
          {articles.length > 0 && (
            <div>
              <FeatureCardRight {...articles[5]} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturePostSection;
