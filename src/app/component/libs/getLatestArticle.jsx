export default async function getLatestArticle() {
  const res = await fetch(
    "http://localhost:5000/api/v1/articles?page=1&limit=8&sort_type=dec&sort_by=updatedAt",
    { cache: "no-cache" }
  );
  if (!res.ok) {
    throw Error("url is not responidng");
  }
  return res.json();
}
