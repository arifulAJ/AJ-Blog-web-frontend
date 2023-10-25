import axios from "axios";
// A reusable function to get the token from the server
// export async function getTokenFromServer() {
//   try {
//     const response = await fetch(
//       "https://ar-blog-api.onrender.com/api/v1/auth/token",
//       {
//         credentials: "include", // Include cookies in the request
//       }
//     );

//     if (response.ok) {
//       const data = await response.json();

//       return data.token;
//     } else {
//       throw new Error("Failed to fetch token");
//     }
//   } catch (error) {
//     throw new Error(`Error fetching token: ${error.message}`);
//   }
// }
export async function getTokenFromServer() {
  // https://ar-blog-api.onrender.com/api/v1/auth/token
  // "http://localhost:8080/api/v1/auth/token"
  try {
    const response = await axios.post(
      "https://ar-blog-api.onrender.com/api/v1/auth/token",
      null,
      {
        withCredentials: true,
      }
    );

    console.log("Response status:", response.status);
    console.log("Response data:", response.data);

    // Handle the response data as needed
    const data = response.data;
    console.log(data);

    if (response.status === 200) {
      return await response.data.token;
    } else {
      throw new Error("Failed to fetch token");
    }
  } catch (error) {
    throw new Error(`Error fetching token: ${error.message}`);
  }
}

// A reusable function to get the token from the server
export async function getUserbyToken() {
  try {
    const response = await axios.get(
      "https://ar-blog-api.onrender.com/api/v1/auth/signin",
      {
        withCredentials: true, // Include cookies in the request
      }
    );
    console.log(response.data, "token");
    if (response.status === 200) {
      const data = await response.data;

      return data;
    } else {
      throw new Error("Failed to fetch token");
    }
  } catch (error) {
    throw new Error(`Error fetching token: ${error.message}`);
  }
}
