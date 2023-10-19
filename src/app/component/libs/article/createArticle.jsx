export default async function createArticle() {
  const res = await fetch("http://localhost:5000/api/v1/articles");
  if (!res.ok) {
    throw Error("this url is not responsding");
  }
  res.json();
}
