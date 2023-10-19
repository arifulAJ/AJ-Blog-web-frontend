import axios from "axios";
// A reusable function to get the token from the server
export async function getTokenFromServer() {
  try {
    const response = await fetch("http://localhost:5000/api/v1/auth/token", {
      credentials: "include", // Include cookies in the request
    });

    if (response.ok) {
      const data = await response.json();

      return data.token;
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
      "http://localhost:5000/api/v1/auth/signin",
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
