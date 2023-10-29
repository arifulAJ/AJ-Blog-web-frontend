export default async function getAuthUser() {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseurl}/api/v1/auth/signin`)
    .then((res) => res.text())
    .then((data) => {
      // Process the data as a string, not JSON
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  if (!res.ok) {
    throw Error("auth url not fettched");
  }
}
