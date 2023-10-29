export default async function createArticle() {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseurl}/api/v1/articles`);
  if (!res.ok) {
    throw Error("this url is not responsding");
  }
  res.json();
}
