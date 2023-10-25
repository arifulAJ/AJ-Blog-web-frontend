import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiLogIn } from "react-icons/bi";
import axios from "axios";
import { getUserbyToken } from "../utils/tokenvarifay/tokenApi";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const ProfilePopup = () => {
  const [avatar, setAvatar] = useState({});
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserbyToken();
        setAvatar(userData); // Set the avatar property in the state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://ar-blog-api.onrender.com/api/v1/auth/logout",
        {
          withCredentials: true,
          cache: "no-store",
        }
      );

      if (response.data.message) {
        console.log("ist is clicked");
        // Clear the token in your context or state
        // Assuming you have a logout function in your context
        toast.success(response.data.message);
        setSuccess(true);
        router.push("/login");
        // Refresh the page after successful logout
        window.location.reload();
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error");
    }
  };

  return (
    <div className="absolute sm:right-0 mt-2 w-48 bg-button-color border border-gray-300 rounded p-2 pt-6 shadow-md z-50">
      <Image
        className="rounded-full border ml-10 w-20 h-20 overflow-hidden "
        src={
          avatar.avatar ||
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/OOjs_UI_icon_userAvatar-progressive.svg/768px-OOjs_UI_icon_userAvatar-progressive.svg.png"
        }
        height={80}
        width={80}
        alt="profile"
      />
      <h4 className="text-center  text-white">{avatar.name}</h4>
      <Link href="/profile" className="block py-1">
        <button className="bg-black hover:bg-green-900 text-white px-4 py-1 font-semibold ml-8 rounded-xl">
          View Profile
        </button>
      </Link>
      <Link
        href="/dashboard"
        className="block py-1 font-semibold text-white hover:text-gray-950"
      >
        Dashboard <hr />
      </Link>

      <Link
        href="/articleCreate"
        className="block py-1 font-semibold text-white hover:text-gray-950"
      >
        Create Article <hr />
      </Link>

      <button
        className="flex items-center text-white font-semibold  hover:text-red-500"
        onClick={handleLogout}
      >
        Logout <BiLogIn />
      </button>
    </div>
  );
};

export default ProfilePopup;
