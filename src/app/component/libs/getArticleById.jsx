export default async function getArticleById(id) {
  const res = await fetch(`http://localhost:5000/api/v1/articles/${id}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw Error("your path is not wokring ");
  }
  return res.json();
}
