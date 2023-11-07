import Link from "next/link";
import getAllArticle from "../../component/libs/getAllArticle";
import Image from "next/image";
import { getArticleNOQuarys } from "../../component/libs/getArticleNOQuary";
const page = async ({ params }) => {
  const authorId = params.id;
  const allArticle = await getArticleNOQuarys();

  const filteredArticle = allArticle.filter((article) => {
    return article.author.id == authorId;
  });

  return (
    <div>
      <div className="px-12 md:px-32 sm:px-12 py-6">
        <h1 className="font-semibold text-2xl text-center py-16">
          {filteredArticle.length > 0
            ? `Articles by ${filteredArticle[0].author.name}`
            : "No articles found"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
          {filteredArticle.map((article) => (
            <Link
              className="font-semibold hover:text-button-color"
              href={`article/${article._id}`}
            >
              <div
                key={article._id}
                className=" p-2 rounded-lg overflow-hidden shadow-md  border-2 border-transparent hover:border-button-color transition duration-300"
              >
                <div className="h-60">
                  <Image
                    src={article.cover}
                    width={400}
                    height={400}
                    alt={`${article.tags} not found`}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <h1 className="font-semibold">Title: {article.title}</h1>
                <p>
                  <span className="font-semibold"> Artice:</span>
                  {article.body.slice(0, 100)} ... Read full article
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
