export default async function getAllArticlesPagination(page) {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(
    `${baseurl}/api/v1/articles?page=${page}&limit=10&sort_type=dec&sort_by=updatedAt`
  );

  if (!res.ok) {
    throw Error("this is not fectched ");
  }
  return res.json();
}
