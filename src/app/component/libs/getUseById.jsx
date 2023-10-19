export default async function getUseById(id) {
  const res = await fetch(`http://localhost:5000/api/v1/user/${id}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw Error("user url not valid");
  }
  return res.json();
}
