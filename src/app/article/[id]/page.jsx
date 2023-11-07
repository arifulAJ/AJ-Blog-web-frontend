import React from "react";

import Image from "next/image";
import getArticleById from "../../component/libs/getArticleById";
import getUseById from "../../component/libs/getUseById";
import ShowComments from "../../component/utils/showComments/showComments";
import Article from "../../component/utils/articleBodyTrim/articleTrim";
const AuthroArticle = async ({ params }) => {
  const findArticleById = await getArticleById(params.id);

  const userId = findArticleById.author.id;
  const findUserById = await getUseById(userId);

  let created = new Date(findArticleById.createdAt);
  created.setHours(created.getHours() + 6);
  const createdAt = created.toLocaleString();
  return (
    <div className=" px-4 sm:px-32 md:px-24 py-12">
      <div className="py-3">
        <button className="bg-button-color text-white font-semibold  px-5 rounded-full">
          {findArticleById.tags}
        </button>
        <h1 className="font-bold text-slate-700  md:text-4xl">
          {findArticleById.title}
        </h1>
      </div>
      <div className="flex pt-3 pb-8  ">
        <Image
          className="rounded-full w-16 h-16  border overflow-hidden  "
          src={
            findUserById.avatar ||
            "https://res.cloudinary.com/arifulislam/image/upload/v1698799492/avatar-default-symbolic-icon-2048x1949-pq9uiebg_mizdd3.png"
          }
          height={400}
          width={400}
          alt="author"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="px-2 text-slate-500">
          <h1 className="uppercase">by {findArticleById.author.name}</h1>
          <h1>{createdAt}</h1>
        </div>
      </div>
      <div>
        <Image
          className="rounded-2xl"
          src={findArticleById.cover}
          width={1100}
          height={600}
          alt={`${findArticleById.tags} image not found`}
        />
        <p className="text-center italic text-slate-500">
          Uploded by, {findArticleById.author.name}
        </p>
      </div>
      <div className="py-4 sm:py-12 px-1">
        {/* <p className="sm:text-2xl text-slate-700">{findArticleById.body}</p> */}
        <Article findArticleById={findArticleById} />
      </div>
      <ShowComments id={params.id} />
    </div>
  );
};

export default AuthroArticle;
// import React from "react";

// import Image from "next/image";
// import getArticleById from "../../component/libs/getArticleById";
// import getUseById from "../../component/libs/getUseById";
// import ShowComments from "../../component/utils/showComments/showComments";

// function splitParagraphIntoMultipleParagraphs(text, wordsPerParagraph) {
//   const words = text.split(" ");
//   const paragraphs = [];
//   let currentParagraph = "";

//   for (let i = 0; i < words.length; i++) {
//     if (i > 0 && i % wordsPerParagraph === 0) {
//       paragraphs.push(<p key={i}>{currentParagraph}</p>);
//       currentParagraph = "";
//     }
//     currentParagraph += words[i] + " ";
//   }

//   if (currentParagraph.trim() !== "") {
//     paragraphs.push(<p key={words.length}>{currentParagraph}</p>);
//   }

//   return paragraphs;
// }

// const AuthroArticle = async ({ params }) => {
//   const findArticleById = await getArticleById(params.id);

//   const userId = findArticleById.author.id;
//   const findUserById = await getUseById(userId);

//   let created = new Date(findArticleById.createdAt);
//   created.setHours(created.getHours() + 6);
//   const createdAt = created.toLocaleString();

//   // Split the article body into paragraphs with line breaks after every 160 words
//   const wordsPerParagraph = 90;
//   const bodyParagraphs = splitParagraphIntoMultipleParagraphs(
//     findArticleById.body,
//     wordsPerParagraph
//   );

//   return (
//     <div className="px-4 sm:px-32 md:px-24 py-12">
//       <div className="py-3">
//         <button className="bg-button-color text-white font-semibold px-5 rounded-full">
//           {findArticleById.tags}
//         </button>
//         <h1 className="font-bold text-slate-700 md:text-4xl">
//           {findArticleById.title}
//         </h1>
//       </div>
//       <div className="flex pt-3 pb-8 ">
//         <Image
//           className="rounded-full w-16 h-16 border overflow-hidden "
//           src={
//             findUserById.avatar ||
//             "https://res.cloudinary.com/arifulislam/image/upload/v1698799492/avatar-default-symbolic-icon-2048x1949-pq9uiebg_mizdd3.png"
//           }
//           height={400}
//           width={400}
//           alt="author"
//           style={{ objectFit: "cover", objectPosition: "center" }}
//         />
//         <div className="px-2 text-slate-500">
//           <h1 className="uppercase">by {findArticleById.author.name}</h1>
//           <h1>{createdAt}</h1>
//         </div>
//       </div>
//       <div>
//         <Image
//           className="rounded-2xl"
//           src={findArticleById.cover}
//           width={1100}
//           height={600}
//           alt={`${findArticleById.tags} image not found`}
//         />
//         <p className="text-center italic text-slate-500">
//           Uploded by, {findArticleById.author.name}
//         </p>
//       </div>
//       <div className="sm:text-2xl px-2 py-4 text-slate-700">
//         {bodyParagraphs}
//       </div>
//       <ShowComments id={params.id} />
//     </div>
//   );
// };

// export default AuthroArticle;
