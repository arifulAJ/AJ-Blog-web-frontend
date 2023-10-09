export default async function getAllUseeOfAuthor() {
  const res = await fetch(
    "http://localhost:5000/api/v1/user?page=1&sort_type=dec&sort_by=updatedAt",
    { cache: "no-cache" }
  );
  if (!res.ok) {
    throw Error("user url is not valid ");
  }
  return res.json();
}
