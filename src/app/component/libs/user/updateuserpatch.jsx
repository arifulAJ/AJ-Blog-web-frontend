const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTM2OGFiNDY0ZjA5MmY2ZTk3MTk1MzgiLCJ1c2VyTmFtZSI6ImlzcSIsImlhdCI6MTY5ODY0NzIyMywiZXhwIjoxNjk4NzMzNjIzfQ.EJDxWUsj7TkE81w8t3X5XRfbGZQCR5ZhY4DmaCPw648"; // Replace with your actual token
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json", // Adjust the content type as needed
};
export default async function updateuserpatch(id, updatedData) {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseurl}/api/v1/user/${id}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(updatedData),
    credentials: "include",
    cache: "no-cache",
  });
  console.log(id, updatedData, await response.json(), "update use api call");
  // if (!response.ok) {
  //   throw Error("Failed to update user data");
  // }

  return response;
}
