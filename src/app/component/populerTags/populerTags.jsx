import getArticleNOQuary from "../libs/getArticleNOQuary";

const PopulerTags = async () => {
  const allArticle = await getArticleNOQuary();

  // Create an object to store tag counts
  const tagCounts = {};

  // Iterate through the articles and count tags
  allArticle.forEach((article) => {
    const tags = article.tags.split(","); // Split tags if they are separated by commas
    tags.forEach((tag) => {
      const trimmedTag = tag.trim(); // Trim whitespace from tags
      if (trimmedTag in tagCounts) {
        tagCounts[trimmedTag]++;
      } else {
        tagCounts[trimmedTag] = 1;
      }
    });
  });

  return (
    <div className="md:px-32 sm:px-12 md:py-1">
      <h1 className="text-center font-semibold text-xl sm:text-2xl">
        Populer Tags
      </h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-4 py-12 sm:py-16	">
        {tagCounts.Nature ? (
          <div className=" grid grid-cols-2 px-4 mx-16 sm:mx-2  border rounded-full ">
            <div>
              <img
                className="rounded-full w-14 h-14"
                src={
                  "https://thumbs.dreamstime.com/z/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247632.jpg"
                }
                alt="nateur"
              />
            </div>
            <div>
              <h1 className="font-semibold">Nature</h1>
              <p>{tagCounts.Nature} posts</p>
            </div>
          </div>
        ) : undefined}
        {tagCounts.Adventure ? (
          <div className=" grid grid-cols-2 px-4 mx-16 sm:mx-2  border rounded-full ">
            <div>
              <img
                className="rounded-full w-14 h-14"
                src={
                  "https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWR2ZW50dXJlfGVufDB8fDB8fHww&w=1000&q=80"
                }
                alt="Adventure"
              />
            </div>
            <div>
              <h1 className="font-semibold">Adventure</h1>
              <p>{tagCounts.Adventure} posts</p>
            </div>
          </div>
        ) : undefined}
        {tagCounts.Food ? (
          <div className=" grid grid-cols-2 px-4 mx-16 sm:mx-2  border rounded-full ">
            <div>
              <img
                className="rounded-full w-14 h-14"
                src={"https://ychef.files.bbci.co.uk/976x549/p04tx3m6.jpg"}
                alt="nateur"
              />
            </div>
            <div>
              <h1 className="font-semibold">Food</h1>
              <p>{tagCounts.Food} posts</p>
            </div>
          </div>
        ) : undefined}
        {tagCounts.Travel ? (
          <div className=" grid grid-cols-2 px-4 mx-16 sm:mx-2  border rounded-full ">
            <div>
              <img
                className="rounded-full w-14 h-14"
                src={
                  "https://media.istockphoto.com/id/1392494719/photo/woman-with-pink-suitcase-and-passport-with-boarding-pass-standing-on-passengers-ladder-of.jpg?s=612x612&w=0&k=20&c=MVUZvIdaUmvRKdG-B5EEGGkIVFj51jss-b6IkxqY3fg="
                }
                alt="Travel"
              />
            </div>
            <div>
              <h1 className="font-semibold">Travel</h1>
              <p>{tagCounts.Travel} posts</p>
            </div>
          </div>
        ) : undefined}
        {tagCounts.Technology ? (
          <div className=" grid grid-cols-2 px-4 mx-16 sm:mx-2  border rounded-full ">
            <div>
              <img
                className="rounded-full w-14 h-14"
                src={
                  "https://imageio.forbes.com/specials-images/imageserve/6200b0dddcf32d3be937fa84/0x0.jpg?format=jpg&width=1200"
                }
                alt="technology"
              />
            </div>
            <div>
              <h1 className="font-semibold">Technology</h1>
              <p>{tagCounts.Technology} posts</p>
            </div>
          </div>
        ) : undefined}
      </div>
    </div>
  );
};

export default PopulerTags;
