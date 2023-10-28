"use client";
import React, { useState, useEffect } from "react";

import getArticleByTags from "../../component/libs/tages/getArticleByTags";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ArticleQuearyCard from "../../component/ui/articlesQuearyCard/articlesQuearyCards";

const TagesSpecific = ({ params }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    // Fetch articles by tag when the page loads or when the tag changes
    async function fetchArticles() {
      try {
        const response = await getArticleByTags(params.id, page);
        const { articles, totalPages } = response;
        setArticles(articles);

        const newPageNumbers = Array.from(
          { length: totalPages },
          (_, i) => i + 1
        );
        setPageNumbers(newPageNumbers);

        setHasMore(page < totalPages);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }

    fetchArticles();
  }, [params.id, page]);

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
        {articles.map((article) => (
          <ArticleQuearyCard key={article._id} article={article} />
        ))}
      </div>
      <div className="flex items-center justify-center space-x-4 mt-4 sm:mt-8">
        <button
          className={`px-4 py-2 rounded flex items-center ${
            page > 1
              ? "bg-button-color text-white hover:bg-hover-effect"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          onClick={handlePreviousClick}
          disabled={page <= 1}
        >
          <AiOutlineLeft />
          Prev
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`px-2 sm:px-4 py-2 rounded ${
              pageNumber === page
                ? "bg-button-color text-white"
                : "bg-gray-300 text-gray-600 hover:bg-hover-effect"
            }`}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className={`px-4 py-2 rounded flex items-center ${
            hasMore
              ? "bg-button-color text-white hover-bg-hover-effect"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          onClick={handleNextClick}
          disabled={!hasMore}
        >
          Next
          <AiOutlineRight />
        </button>
      </div>
    </div>
  );
};

export default TagesSpecific;
