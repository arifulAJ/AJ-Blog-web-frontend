export default async function getAllArticle() {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(
    `${baseurl}/api/v1/articles?page=1&limit=20&sort_type=dec&sort_by=updatedAt`
  );

  if (!res.ok) {
    throw Error("this is not fectched ");
  }
  return res.json();
}
