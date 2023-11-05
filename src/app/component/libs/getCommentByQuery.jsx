export async function getCommentByQuery(id, limit) {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(
    `${baseurl}/api/v1/comments/${id}?page=1&limit=${limit}&sort_by=updatedAt`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    throw Error("this url is not working ");
  }
  return res.json();
}
export async function getAllComment(id) {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(
    `${baseurl}/api/v1/comments/${id}?page=1&sort_by=updatedAt`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    throw Error("this url is not working ");
  }
  return res.json();
}
