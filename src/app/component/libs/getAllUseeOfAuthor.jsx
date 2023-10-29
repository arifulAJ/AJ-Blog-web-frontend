export default async function getAllUseeOfAuthor() {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(
    `${baseurl}/api/v1/user?page=1&sort_type=dec&sort_by=updatedAt`
  );
  if (!res.ok) {
    throw Error("user url is not valid ");
  }
  return res.json();
}
