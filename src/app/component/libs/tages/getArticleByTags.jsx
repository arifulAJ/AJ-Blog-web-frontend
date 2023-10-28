export default async function getArticleByTags(tag, page) {
  // "http://localhost:8080/api/v1/auth/token"
  // `https://ar-blog-api.onrender.com/api/v1/articles?page=${page}&limit=5&sort_by=updatedAt&tags=${tag}`
  const res = await fetch(
    `https://ar-blog-api.onrender.com/api/v1/articles?page=${page}&limit=5&sort_by=updatedAt&tags=${tag}`,
    { cache: "no-cache" }
  );

  if (!res.ok) {
    throw Error("this is not fectched ");
  }
  return res.json();
}
