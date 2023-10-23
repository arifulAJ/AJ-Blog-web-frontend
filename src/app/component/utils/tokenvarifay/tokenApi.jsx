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
  try {
    const response = await axios.get(
      "https://ar-blog-api.onrender.com/api/v1/auth/token",
      {
        withCredentials: true, // Include cookies in the request
      }
    );
    const data = await response.data;
    console.log(data);
    if (response.status === 200) {
      return response.data.token;
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

    if (response.status === 200) {
      const data = response.data;

      return data;
    } else {
      throw new Error("Failed to fetch token");
    }
  } catch (error) {
    throw new Error(`Error fetching token: ${error.message}`);
  }
}
