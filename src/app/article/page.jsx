"use client";

import React, { useState, useEffect } from "react";
import getAllArticlesPagination from "../component/libs/getAllArticlesPagination";
import ArticleQuearyCard from "../component/ui/articlesQuearyCard/articlesQuearyCards";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const ShowArticleByPagination = () => {
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [maxPageNumbers, setMaxPageNumbers] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const allarticles = await getAllArticlesPagination(page);
      const newArticles = allarticles.articles;

      if (newArticles.length === 0) {
        // No more articles to load
        setHasMore(false);
        return;
      }
      setAllArticles(allarticles.pagination.totalPages);
      setArticles(newArticles);
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    // Calculate the range of page numbers to display based on window width
    setMaxPageNumbers(window.innerWidth < 768 ? 5 : 10);
  }, []);

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage(page - 1);
      setHasMore(true); // Re-enable the "Next" button
    }
  };

  const handleNextClick = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  // Calculate the range of page numbers to display
  const startPage = Math.max(1, page - Math.floor(maxPageNumbers / 2));
  const endPage = Math.min(startPage + maxPageNumbers - 1, allArticles);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <div className="py-8 px-3 md:py-12">
      <div className="px-6 md:px-32 sm:px-12">
        <h1 className="text-center text-xl sm:text-2xl md:text-4xl font-semibold">
          Welcome To Our Articles Hub
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
          {articles.map((article) => (
            <ArticleQuearyCard key={article._id} article={article} />
          ))}
        </div>
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

export default ShowArticleByPagination;
