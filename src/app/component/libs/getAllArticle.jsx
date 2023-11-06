// export default async function getAllArticle() {
//   const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
//   const res = await fetch(
//     `${baseurl}/api/v1/articles?page=1&limit=20&sort_type=dec&sort_by=updatedAt`
//   );

//   if (!res.ok) {
//     throw Error("this is not fectched ");
//   }
//   return res.json();
// }
export default async function getAllArticle() {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const apiUrl = `${baseurl}/api/v1/articles?page=1&limit=100&sort_type=dec&sort_by=updatedAt`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch data - Status Code: ${response.status}`);
    }

    const data = await response.json();

    // Filter articles to ensure unique tags
    const uniqueTags = new Set();
    const uniqueArticles = [];

    data.articles.forEach((article) => {
      if (!uniqueTags.has(article.tags)) {
        uniqueTags.add(article.tags);
        uniqueArticles.push(article);
      }
    });

    return uniqueArticles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error; // Re-throw the error to be handled elsewhere if needed
  }
}
