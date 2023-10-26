export default async function getArticleById(id) {
  // "http://localhost:8080/api/v1/auth/token"
  // https://ar-blog-api.onrender.com/api/v1/articles/${id}
  const res = await fetch(
    `https://ar-blog-api.onrender.com/api/v1/articles/${id}`,
    {
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    throw Error("your path is not wokring ");
  }
  return res.json();
}
