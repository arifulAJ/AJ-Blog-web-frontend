import React from "react";
import FeatureCard from "./featureCard/featureCard";
import FeatureCardRight from "./featureCard/featureCardRight";
import getAllArticle from "../libs/getAllArticle";

const FeaturePostSection = async () => {
  // const [articles, setArticles] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

  // useEffect(() => {
  //   const apiUrl = `${baseurl}/api/v1/articles?page=1&limit=100&sort_type=dec&sort_by=updatedAt`;

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(apiUrl);
  //       if (!response.ok) {
  //         throw new Error(
  //           `Failed to fetch data - Status Code: ${response.status}`
  //         );
  //       }

  //       const data = await response.json();

  //       // Filter articles to ensure unique tags
  //       const uniqueTags = new Set();
  //       const uniqueArticles = [];

  //       data.articles.forEach((article) => {
  //         if (!uniqueTags.has(article.tags)) {
  //           uniqueTags.add(article.tags);
  //           uniqueArticles.push(article);
  //         }
  //       });

  //       setArticles(uniqueArticles);
  //     } catch (error) {
  //       console.error("Error fetching articles:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [baseurl, loading]);

  const articles = await getAllArticle();
  // setArticles(articleTags);
  return (
    <div className="pl-2 md:px-32 py-16">
      <h1 className="text-center font-semibold text-xl sm:text-2xl">
        Feature Posts
      </h1>
      {/* {loading && (
        <h1 className="text-4xl text-red-600">
          Retriveing the article.........
        </h1>
      )} */}
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
