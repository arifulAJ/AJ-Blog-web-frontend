export default async function getCommentByQuery() {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(
    `${baseurl}/api/v1/comments?page=1&limit=50&sort_type=dec&sort_by=updatedAt`
  );
  if (!res.ok) {
    throw Error("this url is not working ");
  }
  return res.json();
}
