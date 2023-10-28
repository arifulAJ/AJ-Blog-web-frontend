"use client";
import React, { useState } from "react";
import getAllArticlesPagination from "../component/libs/getAllArticlesPagination";
import ArticleQuearyCard from "../component/ui/articlesQuearyCard/articlesQuearyCards";
import Pagination from "../component/ui/articlesPagination/articlePagination";
const ShowAritlcleByPagination = async () => {
  const num = 1;
  const [page, setPage] = useState(num);
  const allarticles = await getAllArticlesPagination(page, 10);
  const articles = await allarticles.articles;

  return (
    <div>
      <div className=" px-6 md:px-32 sm:px-12 md:py-8   ">
        <h1 className="text-center font-semibold text-xl sm:text-2xl">
          Welcome To Our Articles Hub
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 align-middle py-12">
          {articles.map((article) => (
            <ArticleQuearyCard key={article._id} article={article} />
          ))}
        </div>
        {/* <Pagination article={allarticles} /> */}
        <div className="flex items-center justify-center space-x-4 mt-8">
          {page >= 1 ? (
            <p
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
              onClick={() => setPage(num--)}
            >
              Previous
            </p>
          ) : (
            <p
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded cursor-not-allowed"
              disabled
            >
              Previous
            </p>
          )}

          {page <= 1 ? (
            <h1>
              <p
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
                onClick={() => setPage(num++)}
              >
                Next
              </p>
            </h1>
          ) : (
            <p
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded cursor-not-allowed"
              disabled
            >
              Next
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowAritlcleByPagination;
