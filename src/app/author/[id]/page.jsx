import Link from "next/link";
import getAllArticle from "../../component/libs/getAllArticle";
import Image from "next/image";
const page = async ({ params }) => {
  const authorId = params.id;
  const allArticle = await getAllArticle();

  const articles = allArticle.articles;
  const filteredArticle = articles.filter((article) => {
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
            <div
              key={article._id}
              className=" p-2 rounded-lg overflow-hidden shadow-md  border-2 border-transparent hover:border-button-color transition duration-300"
            >
              <Image
                src={article.cover}
                width={500}
                height={500}
                alt={`${article.tags} not found`}
              />
              <h1 className="font-semibold">Title: {article.title}</h1>
              <p>
                <span className="font-semibold"> Artice:</span>
                {article.body.slice(0, 100)} ...
                <Link
                  className="font-semibold hover:text-button-color"
                  href={`article/${article._id}`}
                >
                  Read full article
                </Link>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
