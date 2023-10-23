export default async function getUseById(id) {
  const res = await fetch(
    `https://ar-blog-api.onrender.com/api/v1/user/${id}`,
    {
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    throw Error("user url not valid");
  }
  return res.json();
}
