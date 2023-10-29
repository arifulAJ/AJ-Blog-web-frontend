export default async function getArticleById(id) {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseurl}/api/v1/articles/${id}`);
  if (!res.ok) {
    throw Error("your path is not wokring ");
  }
  return res.json();
}
