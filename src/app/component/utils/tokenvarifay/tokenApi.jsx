import axios from "axios";
const basurl = process.env.BASE_URL;

export async function getTokenFromServer() {
  // https://ar-blog-api.onrender.com/api/v1/auth/token
  // "http://localhost:8080/api/v1/auth/token"
  try {
    const response = await axios.post(
      `https://ar-blog-api.onrender.com/api/v1/auth/token`,
      null,
      {
        withCredentials: true,
      }
    );

    // Handle the response data as needed
    const data = response.data;

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
