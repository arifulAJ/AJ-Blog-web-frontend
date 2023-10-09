export default async function getArticleNOQuary() {
  const res = await fetch("http://localhost:5000/api/v1/articles/all", {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw Error("this article are not abiable here ");
  }
  return res.json();
}
