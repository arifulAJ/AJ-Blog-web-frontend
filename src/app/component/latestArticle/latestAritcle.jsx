import getLatestArticle from "../libs/getLatestArticle";
import LatestArticleCard from "./latestArticleCard";

const LatestAritcle = async () => {
  const allLatestArticles = await getLatestArticle();

  const latest = allLatestArticles.articles;

  return (
    <div className=" px-6 md:px-32 sm:px-12 md:py-8  bg-alice-blue ">
      <h1 className="text-center font-semibold text-xl sm:text-2xl">
        Explore our latest Article
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 align-middle py-12">
        {latest.map((article) => (
          <LatestArticleCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default LatestAritcle;
