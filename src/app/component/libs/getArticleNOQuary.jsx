export default async function getArticleNOQuary() {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseurl}/api/v1/articles/all`);

  if (!res.ok) {
    throw Error("this article are not abiable here ");
  }
  return res.json();
}
