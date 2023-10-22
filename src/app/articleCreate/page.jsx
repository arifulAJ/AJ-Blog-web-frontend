"use client";
import React, { useState, useEffect } from "react";
import AvatarUpload from "../component/utils/avaterUplode/avaterUplode";

import { getTokenFromServer } from "../component/utils/tokenvarifay/tokenApi";
import toast from "react-hot-toast";
// import uploadImageToCloudinary from "../component/utils/avaterUplode/uplodeFunction";
const initialData = {
  title: "",
  body: "",
  tags: "",
  cover: "",
  status: "draft",
};
const ArticleForm = () => {
  const [formData, setFormData] = useState(initialData);
  const [isToken, setIsToken] = useState(null);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    getTokenFromServer()
      .then((fetchedToken) => {
        if (fetchedToken) {
          setIsToken(fetchedToken);
        } else {
          router.push("/home");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleAvatarChange = (avatarUrl) => {
    // Update the "avatar" field in formData with the selected avatar URL

    setFormData({
      ...formData,
      cover: avatarUrl,
    });
  };
  let token = isToken;
  const headers = {
    Authorization: `Bearer ${token}`,

    "Content-Type": "application/json",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/v1/articles", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
      credentials: "include",
      cache: "no-cache",
    });

    const { code, data, message } = await res.json();
    if (code === 400) {
      setErrors(data);
      console.error(message);
    }
    if (code === 201) {
      setFormData(initialData);
      toast.success("Successfully toasted!");
      setErrors({});
    }
    // Add your validation logic here
    const validationErrors = {};
    if (!formData.title) {
      validationErrors.title = "Title is required";
    }
    if (!formData.body) {
      validationErrors.body = "Body is Required";
    }
    if (!formData.cover) {
      validationErrors.cover = "Cover is Required";
    }
    if (!formData.tags) {
      validationErrors.tags = "Tags is Required";
    }

    if (!formData.status) {
      validationErrors.status = "Statuse is Required";
    }

    // Add more validation checks for other fields

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Submit the form data to your API
      console.log(formData);
      // You can make an API request to create the article here
    }
  };

  return (
    <div className="w-full bg-transparent bg-slate-300  p-2 sm:p-12">
      <h1 className=" font-bold text-slate-700 sm:text-4xl p-3 pb-12">
        "Unleash the Boundless Power of Your Imagination, Craft Captivating
        Narratives, and Inspire the World with the Brilliance of Your Words."
      </h1>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white rounded-md p-8 shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              <h1 className="text-2xl">Title</h1>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Write your valuable title for Article"
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700"
            >
              <h1 className="text-2xl">Body</h1>
            </label>
            <textarea
              id="body"
              name="body"
              placeholder="Write  hear the Article body "
              value={formData.body}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.body && (
              <p className="text-red-500 text-sm">{errors.body}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              <h1 className="text-2xl">Tags</h1>
            </label>
            <select
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select a tag</option>
              <option value="nature">Nature</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="game">Game</option>
              <option value="technology">Technology</option>
              <option value="adventure">Adventure</option>
              <option value="HealthCare">HealthCare</option>
              <option value="Historical place">Historical place</option>
            </select>
            {errors.tags && (
              <p className="text-red-500 text-sm">{errors.tags}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="cover"
              className="block text-sm font-medium text-gray-700"
            >
              <h1 className="text-2xl">Cover</h1>
            </label>
            <div className="mb-4">
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              {/* Use the AvatarUpload component here and pass handleAvatarChange as a prop */}
              <AvatarUpload onAvatarChange={handleAvatarChange} />
            </div>
          </div>
          {errors.cover && (
            <p className="text-red-500 text-sm">{errors.cover}</p>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              <h1 className="text-2xl">Status</h1>
            </label>
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="status"
                  value="draft"
                  checked={formData.status === "draft"}
                  onChange={handleChange}
                />
                <span className="ml-2">Draft</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="status"
                  value="published"
                  checked={formData.status === "published"}
                  onChange={handleChange}
                />
                <span className="ml-2">Published</span>
              </label>
            </div>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status}</p>
            )}
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-button-color hover:bg-hover-effect text-white p-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleForm;
