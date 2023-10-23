export default async function getCommentByQuery() {
  const res = await fetch(
    "https://ar-blog-api.onrender.com/api/v1/comments?page=1&limit=50&sort_type=dec&sort_by=updatedAt",
    { cache: "no-cache" }
  );
  if (!res.ok) {
    throw Error("this url is not working ");
  }
  return res.json();
}
