export default async function getUseById(id) {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseurl}/api/v1/user/${id}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw Error("user url not valid");
  }
  return res.json();
}
