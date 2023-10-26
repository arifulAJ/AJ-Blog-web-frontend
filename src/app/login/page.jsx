"use client";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { toast } from "react-hot-toast";
import axios from "axios";
import { getTokenFromServer } from "../component/utils/tokenvarifay/tokenApi";
const basurl = process.env.BASE_URL;
const initialUser = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [formData, setFormData] = useState(initialUser);
  const [error, setError] = useState({});
  const [typeError, setTypeError] = useState("");

  const router = useRouter();
  useEffect(() => {
    getTokenFromServer()
      .then((fetchedToken) => {
        if (fetchedToken) {
          // setIsToken(fetchedToken);
          console.log(fetchedToken);
        } else {
          router.push("/home");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      // Example validation for the "Email" field (you can customize this)
      if (!/^[A-Za-z0-9+_.-]+@(.+)$/.test(value)) {
        setError({ ...error, [name]: "Invalid email format" });
      } else {
        setError({ ...error, [name]: "" }); // Clear the error if it's valid
      }
    }
    if (name === "password") {
      // Example validation for the "Password" field
      if (value.length < 5) {
        setError({
          ...error,
          [name]: "Password must be at least 5 characters long",
        });
      } else {
        setError({ ...error, [name]: "" }); // Clear the error if it's valid
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Email and Password are required.");
      return;
    }

    try {
      const response = await fetch(
        `https://ar-blog-api.onrender.com/api/v1/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
          cache: "no-cache",
        }
      );

      // Check if the response status is OK (200)
      if (response.status === 200) {
        // Parse the response JSON data
        const { code, message, data } = await response.json();

        // Check if the response headers contain the Set-Cookie header
        const setCookieHeader = response.headers.get("set-cookie");
        console.log(setCookieHeader, "why this is not working");

        if (setCookieHeader) {
          // Extract the token from the Set-Cookie header
          const token = setCookieHeader.split(";")[0].split("=")[1];

          // Now, you have the token, and you can handle it as needed
          console.log("Token from Set-Cookie header:", token);
        }

        if (code === 200) {
          // Successfully logged in, you can handle the token here
          toast.success(message);
          router.push("/home");
        } else {
          // Handle other cases, such as validation errors or authentication failures
          console.error("Authentication failed:", message);
          toast.error(message);
        }
      } else {
        // Handle response status other than 200 (e.g., 401, 400, etc.)
        console.error("Authentication failed:", response.status);
        toast.error("Authentication failed.");
      }
    } catch (e) {
      // Handle unexpected errors
      console.error("Error:", e);
      toast.error("An error occurred.");
    }
  };

  return (
    <div>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow p-8 w-96">
          <Head>
            <title>Sign In</title>
          </Head>
          <h2 className="text-2xl font-semibold mb-4">Sign In</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {error.email ? <p className="text-red-600">{error.email}</p> : ""}
              {typeError ? <p className="text-red-600">{typeError}</p> : ""}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {error.password ? (
                <p className="text-red-600">{error.password}</p>
              ) : (
                ""
              )}
              {typeError ? <p className="text-red-600">{typeError}</p> : ""}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
        <p className="text-1xl text-slate-500 pt-3">
          If you do not have an account
          <Link className="font-semibold text-button-color" href="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
