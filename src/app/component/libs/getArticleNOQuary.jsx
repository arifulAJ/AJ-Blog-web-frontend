export default async function getArticleNOQuary() {
  const res = await fetch(
    "https://ar-blog-api.onrender.com/api/v1/articles/all",
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw Error("this article are not abiable here ");
  }
  return res.json();
}
