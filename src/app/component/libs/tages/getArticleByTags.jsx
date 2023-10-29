export default async function getArticleByTags(tag, page) {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(
    `${baseurl}/api/v1/articles?page=${page}&limit=5&sort_by=updatedAt&tags=${tag}`,
    { cache: "no-cache" }
  );

  if (!res.ok) {
    throw Error("this is not fectched ");
  }
  return res.json();
}
