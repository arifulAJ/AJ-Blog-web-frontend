export default async function getAllUseeOfAuthor() {
  const res = await fetch(
    "https://ar-blog-api.onrender.com/api/v1/user?page=1&sort_type=dec&sort_by=updatedAt",
    { cache: "no-cache" }
  );
  if (!res.ok) {
    throw Error("user url is not valid ");
  }
  return res.json();
}
