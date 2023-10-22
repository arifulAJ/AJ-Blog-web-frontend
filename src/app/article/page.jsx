"use client";
import React, { useState } from "react";

const AllArticle = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // New state to store the image URL
  const [response, setResponse] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    setResponse("Uploading...");

    if (!file) {
      setResponse("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "image_preset");

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME; // Replace with your Cloudinary cloud name
      const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const secureUrl = data.secure_url; // Extract the image URL from the response
        setImageUrl(secureUrl); // Store the image URL in state
        setResponse(`Image uploaded successfully. Secure URL: ${secureUrl}`);
      } else {
        setResponse(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Upload an Image to Cloudinary</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
      <div>{response}</div>

      {/* Display the image using the retrieved URL */}
      {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
    </div>
  );
};

export default AllArticle;
