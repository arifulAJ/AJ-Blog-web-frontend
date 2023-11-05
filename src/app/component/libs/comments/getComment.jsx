export default async function getComments() {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(
    `${baseurl}/api/v1/comments?page=1&limit=5&sort_by=updatedAt`
  );

  if (!res.ok) {
    throw Error("this is not fectched ");
  }
  return res.json();
}
