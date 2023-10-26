export default async function getAllArticlesPagination() {
  // "http://localhost:8080/api/v1/auth/token"
  // "https://ar-blog-api.onrender.com/api/v1/articles?page=1&limit=10&sort_type=dec&sort_by=updatedAt"
  const res = await fetch(
    "http://localhost:8080/api/v1/articles?page=1&limit=10&sort_type=dec&sort_by=updatedAt",
    { cache: "no-cache" }
  );

  if (!res.ok) {
    throw Error("this is not fectched ");
  }
  return res.json();
}