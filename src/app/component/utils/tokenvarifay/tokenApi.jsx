import axios from "axios";

const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
export async function getTokenFromServer() {
  try {
    const response = await axios.post(`${baseurl}/api/v1/auth/token`, null, {
      withCredentials: true,
      cache: "no-cache",
    });

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
    const response = await axios.get(`${baseurl}/api/v1/auth/signin`, {
      withCredentials: true, // Include cookies in the request
    });

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
