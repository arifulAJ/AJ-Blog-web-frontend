"use client";
import { useState } from "react";

import Head from "next/head";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const initialFormData = {
  name: "",
  email: "",
  password: "",
};

const SignUPPage = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState({});
  const [isUsed, setIsUsed] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Perform real-time validation as the user types
    if (name === "name") {
      // Example validation for the "Name" field (you can customize this)
      if (!/^[A-Za-z\s]+$/.test(value)) {
        setError({
          ...error,
          [name]: "Name should contain only letters and spaces",
        });
      } else {
        setError({ ...error, [name]: "" }); // Clear the error if it's valid
      }
    }

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

    // Update the form data
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic can be added here

    try {
      // Send the form data to your server or API
      const response = await fetch(
        "http://localhost:5000/api/v1/auth/signup",

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

      const responsData = await response.json();

      setIsUsed(responsData.data);
      if (response.ok) {
        // Signup was successful

        toast.success(responsData.message);
        router.push("/home");

        setFormData(initialFormData);
        setError({});
        window.location.reload();
      } else {
        // Signup failed, handle errors here
        const userData = await response.json();
        console.error("Signup failed:", userData);
        setError(userData.data);
        toast.error(userData.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow p-8 w-96">
          <Head>
            <title>Signup</title>
          </Head>
          <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  error.name ? "border-red-500" : "" // Add a red border if there's an error
                }`}
                id="name"
                type="text"
                name="name"
                placeholder="Md Ariful Islam"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {error.name ? <p className="text-red-600">{error.name}</p> : ""}
              {isUsed.name ? <p className="text-red-600">{isUsed.name}</p> : ""}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  error.email ? "border-red-500" : "" // Add a red border if there's an error
                }`}
                id="email"
                type="email"
                name="email"
                placeholder="ariful@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {error.email ? <p className="text-red-600">{error.email}</p> : ""}
              {isUsed.email ? (
                <p className="text-red-600">{isUsed.email}</p>
              ) : (
                ""
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  error.password ? "border-red-500" : "" // Add a red border if there's an error
                }`}
                id="password"
                type="password"
                name="password"
                placeholder="provide valid password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {error.password ? (
                <p className="text-red-600">{error.password}</p>
              ) : (
                ""
              )}
            </div>
            <button
              className="bg-button-color hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
        <p className="text-1xl text-slate-500 pt-3">
          Already have an account{" "}
          <Link className="font-semibold text-button-color" href={"/login"}>
            {" "}
            SingIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUPPage;
