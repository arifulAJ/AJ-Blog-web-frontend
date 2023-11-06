export default async function getLatestArticle() {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(
    `${baseurl}/api/v1/articles?page=1&limit=9&sort_type=dec&sort_by=updatedAt`,
    {
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    throw Error("url is not responidng");
  }
  return res.json();
}
