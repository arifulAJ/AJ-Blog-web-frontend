export default async function getAllArticle() {
  const res = await fetch(
    "http://localhost:5000/api/v1/articles?page=1&limit=20&sort_type=dec&sort_by=updatedAt",
    { cache: "no-cache" }
  );

  if (!res.ok) {
    throw Error("this is not fectched ");
  }
  return res.json();
}
