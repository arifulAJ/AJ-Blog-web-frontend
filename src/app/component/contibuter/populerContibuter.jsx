import React from "react";
import getArticleNOQuary from "../libs/getArticleNOQuary";
import getAllUseeOfAuthor from "../libs/getAllUseeOfAuthor";
import Image from "next/image";
import Link from "next/link";

const PopulerContibuter = async () => {
  // Fetch articles and authors
  const allArticles = await getArticleNOQuary();
  const allUsers = await getAllUseeOfAuthor();
  // Function to count articles by author
  function countArticlesByAuthor(articles) {
    const authorArticleCounts = {};

    articles.forEach((article) => {
      const authorId = article.author.id;
      if (authorArticleCounts[authorId]) {
        authorArticleCounts[authorId]++;
      } else {
        authorArticleCounts[authorId] = 1;
      }
    });

    return authorArticleCounts;
  }

  // Calculate article counts for authors with at least one article
  const authorArticleCounts = countArticlesByAuthor(allArticles);

  // Filter authors with at least one article
  const authorsWithAtLeastOneArticle = allUsers.retrieveAllUsers.filter(
    (author) => {
      const authorId = author._id;

      return authorArticleCounts[authorId] > 0;
    }
  );

  // Create an array of authors with article counts
  const authorsWithCounts = authorsWithAtLeastOneArticle.map((author) => ({
    ...author,
    articleCount: authorArticleCounts[author._id] || 0,
  }));

  // Sort authors by article count in descending order
  const sortedAuthors = authorsWithCounts.sort(
    (a, b) => b.articleCount - a.articleCount
  );

  return (
    <div className=" px-12 md:px-32 sm:px-12 py-6">
      <h1 className="font-semibold text-2xl text-center py-16">
        Popular and Active Contributors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {sortedAuthors.map((author) => (
          <Link key={author._id} href={`/author/${author._id}`}>
            <div className="border rounded-lg overflow-hidden shadow-md hover:text-alice-blue hover:bg-hover-effect transition duration-500">
              <div
                key={author._id}
                className=" flex flex-col justify-center items-center h-full p-3"
              >
                <Image
                  className="  rounded-full text-center w-36 h-36 sm:w-40 sm:h-44 object-cover "
                  src={author.avatar}
                  width={200}
                  height={100}
                  alt={`${author.name}'s Avatar`}
                />
                <h2 className="text-lg font-semibold  ">{author.name}</h2>
                <p className=" ">Posts: {author.articleCount} Articles</p>
              </div>{" "}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopulerContibuter;
