export default async function siginUpFetch(formData) {
  const response = await fetch(
    "http://localhost:5000/api/v1/auth/signup",
    { cache: "no-cache" },
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  console.log(response, "this is response ");
  if (response.ok) {
    // Redirect to a success page or handle the success scenario
    console.log("Signup successful");
  } else {
    // Handle errors here
    console.error("Signup failed");
  }
  return response;
}
