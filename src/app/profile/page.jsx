"use client";
import React, { useEffect, useState } from "react";
import updateuserpatch from "../component/libs/user/updateuserpatch";
import {
  getTokenFromServer,
  getUserbyToken,
} from "../component/utils/tokenvarifay/tokenApi";
import UserImageUpload from "../component/utils/userImageuploda/userImageupload";
import Image from "next/image";
import { toast } from "react-hot-toast";
import withPrivateRoute from "../component/utils/privetRoute/privetRoute";

import { ImCross } from "react-icons/im";
const initialupdteValue = {
  name: "",
  password: "",
  avatar: "",
};

const Profile = () => {
  const [profileData, setProfileData] = useState(initialupdteValue);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState({});
  const [tokens, setTokens] = useState("");
  const [viewProfile, setViewProfile] = useState({});
  const [isVisiable, setIsVisiable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserbyToken();
        const userToken = await getTokenFromServer();
        // const user = await updateuserpatch(userData._id);
        setViewProfile(userData);
        setUserId(userData._id);
        setTokens(userToken);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleAvatarChange = (avatarUrl) => {
    // Update the "avatar" field in formData with the selected avatar URL

    setProfileData({
      ...profileData,
      avatar: avatarUrl,
    });
  };

  const headers = {
    Authorization: `Bearer ${tokens}`,
    "Content-Type": "application/json", // Adjust the content type as needed
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API requests to update the user's password and name
      // const respons = await updateuserpatch(userId, profileData);
      const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
      const url = `${baseurl}/api/v1/user/${userId}`;

      const response = await fetch(url, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(profileData),
        credentials: "include",
        cache: "no-cache",
      });

      // You need to implement the logic for this

      const user = await response.json();

      if (user.code === 400) {
        toast.error(user.message);
        setError(user.data);
      }
      if (response.ok) {
        setProfileData(user);
        setProfileData(initialupdteValue);

        toast.success(user.message);
        setIsVisiable(false);
        window.location.reload();
      }
      if (response.status === 409) {
        toast.error(user.message);
      }

      // After successfully updating, you can set a success message
      setSuccessMessage("Profile updated successfully");
    } catch (error) {
      // Handle error and set an error message
      setErrorMessage("Error updating profile");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="px-1 sm:px-12 m-5 md:flex">
      <div className="bg-slate-300 p-12 md:p-2">
        <div>
          <Image
            className="rounded-2xl"
            src={
              viewProfile.avatar ||
              "https://res.cloudinary.com/arifulislam/image/upload/v1698799492/avatar-default-symbolic-icon-2048x1949-pq9uiebg_mizdd3.png"
            }
            width={300}
            height={300}
            alt="user"
          />
        </div>
        <div className="sm:text-xl font-semibold sm:py-4">
          <h1>Name: {viewProfile.name}</h1>
          <h1>Email: {viewProfile.email}</h1>
          <h1>Role: {viewProfile.role}</h1>
          <button
            className="bg-button-color hover:bg-hover-effect text-white p-2 sm:p-4 rounded-xl"
            onClick={() => setIsVisiable(!isVisiable)}
          >
            Update Profile
          </button>
        </div>
      </div>

      {isVisiable && (
        <div className=" bg-slate-100">
          <div className=" text-right">
            <button
              className="bg-button-color  hover:bg-hover-effect text-white text-lg font-bold py-2 px-4 rounded"
              onClick={() => setIsVisiable(false)}
            >
              <ImCross />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="  md:flex p-12  ">
            <div className="mb-4 p-12  ">
              <UserImageUpload
                onAvatarChange={handleAvatarChange}
                initialAvatarUrl={viewProfile.avatar}
              />
              {error.avatar && <p className="text-red-500">{error.avatar}</p>}
            </div>
            <div className="md:w-60">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-600 font-semibold"
                >
                  Full Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="change your name (optional)"
                  value={profileData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {error.name && <p className="text-red-500">{error.name}</p>}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-600 font-semibold"
                >
                  Change Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="change your password (optional)"
                  value={profileData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {error.password && (
                  <p className="text-red-500">{error.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700 "
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
      {/* {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}
    </div>
  );
};

export default withPrivateRoute(Profile);
