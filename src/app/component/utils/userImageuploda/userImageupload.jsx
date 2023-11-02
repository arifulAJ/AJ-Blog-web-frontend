import axios from "axios";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaCamera, FaEdit } from "react-icons/fa";

function UserImageUpload({ onAvatarChange, initialAvatarUrl }) {
  const [isUploading, setIsUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setAvatarUrl(initialAvatarUrl);
  }, [initialAvatarUrl]);

  const uploadFile = async (file) => {
    const data = new FormData();

    if (file && file instanceof File) {
      if (file.size > 300000) {
        toast.error("Your file is too big. Maximum file size is 3000 KB.");
        return;
      }
      data.append("file", file);
      data.append("upload_preset", "image_preset");
    }
    try {
      setIsUploading(true);
      let cloudeName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
      let resoceType = "image";
      let api = `https://api.cloudinary.com/v1_1/${cloudeName}/${resoceType}/upload`;
      console.log(api);
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      setAvatarUrl(secure_url); // Update the avatar URL after successful upload
      return secure_url;
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageClick = () => {
    if (!isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      try {
        const imgUrl = await uploadFile(selectedFile);
        onAvatarChange(imgUrl);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {isUploading && <p className="text-red-700">Loading...</p>}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />

      <div className="h-32 w-32  relative text-right">
        <div
          className="relative "
          onClick={handleImageClick}
          onTouchStart={handleImageClick}
        >
          <Image
            src={
              avatarUrl ||
              "https://res.cloudinary.com/arifulislam/image/upload/v1698799492/avatar-default-symbolic-icon-2048x1949-pq9uiebg_mizdd3.png"
            }
            height={100}
            width={100}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-2 border-hover-effect  relative"
          />
          <div className="absolute bottom-0 right-0 px-4 py-3 text-right">
            <FaCamera
              className="text-black z-30 text-2xl"
              style={{
                background: "white",
                borderRadius: "50%",
                padding: "4px",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>
      <p className="text-xl font-semibold text-slate-700">Upload Image</p>
    </div>
  );
}

export default UserImageUpload;
