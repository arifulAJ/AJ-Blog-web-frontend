import React from "react";
import getAllArticlesPagination from "../component/libs/getAllArticlesPagination";
import ArticleQuearyCard from "../component/ui/articlesQuearyCard/articlesQuearyCards";
import Pagination from "../component/ui/articlesPagination/articlePagination";
const ShowAritlcleByPagination = async () => {
  const allarticles = await getAllArticlesPagination();
  const articles = allarticles.articles;

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
        <Pagination article={allarticles} />
      </div>
    </div>
  );
};

export default ShowAritlcleByPagination;
