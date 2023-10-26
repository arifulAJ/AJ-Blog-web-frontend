export default async function createArticle() {
  const res = await fetch("https://ar-blog-api.onrender.com/api/v1/articles");
  if (!res.ok) {
    throw Error("this url is not responsding");
  }
  res.json();
}
