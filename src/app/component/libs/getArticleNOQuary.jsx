export default async function getArticleNOQuary() {
  // "http://localhost:8080/api/v1/auth/token"
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
