export default async function getAuthUser() {
  const res = await fetch(
    "https://ar-blog-api.onrender.com/api/v1/auth/signin",
    {
      cache: "no-cache",
    }
  )
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
