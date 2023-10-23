import React, { useEffect, useState } from "react";
import { getAuthenticationToken } from "../utils/auth";

const ShowUser = () => {
  const token = getAuthenticationToken();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(
          "https://ar-blog-api.onrender.com/api/v1/auth/signin",
          {
            method: "GET", // Use GET for fetching user information
            headers: {
              Authorization: ` ${token}`,
            },
            cache: "no-cache",
          }
        );

        if (res.ok) {
          const userData = await res.json();
          setUser(userData.user);
        } else {
          // Handle the error here if the request was not successful
          console.error("Error fetching user information");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchUser();
  }, [token]);

  return (
    <div>
      <h1>Show User</h1>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          {/* Add more user details as needed */}
        </div>
      )}
    </div>
  );
};

export default ShowUser;
