import React from "react";
import getArticleById from "../../../component/libs/getArticleById";
import Image from "next/image";
const AuthroArticle = async ({ params }) => {
  const findArticleById = await getArticleById(params.id);

  return (
    <div className="px-32 py-12">
      <div>
        <Image
          src={findArticleById.cover}
          width={600}
          height={400}
          alt={`${findArticleById.tags} image not found`}
        />
      </div>
      <div>
        <h1>{findArticleById.title}</h1>
      </div>
    </div>
  );
};

export default AuthroArticle;
