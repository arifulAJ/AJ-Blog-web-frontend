import Link from "next/link";
import getArticleNOQuary from "../libs/getArticleNOQuary";

import Image from "next/image";

const PopulerTags = async () => {
  const { counts: tagCounts, covers: coverImages } = await getArticleNOQuary();

  return (
    <div className="md:px-32 sm:px-12 md:py-1">
      <h1 className="text-center font-semibold text-xl sm:text-2xl">
        Popular Tags
      </h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 py-12 sm:py-16">
        {Object.keys(tagCounts).map((tag) => (
          <div key={tag} className="grid grid-col sm:mx-2 border rounded-full">
            <Link
              href={`/tags/${tag}`}
              className="flex items-center  justify-around "
            >
              <div>
                <Image
                  className="rounded-full border-2 w-20 h-20"
                  src={coverImages[tag]}
                  width={300}
                  height={200}
                  alt={tag}
                />
              </div>
              <div className="ml-4 ">
                <h1 className="font-semibold">{tag}</h1>
                <p>Posts: {tagCounts[tag]} </p>
              </div>
            </Link>
          </div>
        ))}
        <Link
          href={"/tags"}
          className="flex items-center border rounded-full  justify-around "
        >
          <div className="rounded-full border-2 w-20 h-20 overflow-hidden">
            <Image
              src={"/pngegg.png"}
              width={300}
              height={200}
              alt={"tags logo"}
            />
          </div>
          <div className="ml-4  ">
            <h1 className="font-semibold">Explore more Tags +</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PopulerTags;
