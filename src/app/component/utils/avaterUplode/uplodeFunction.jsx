import axios from "axios";

async function uploadImageToCloudinary(file) {
  const data = new FormData();

  if (file instanceof File) {
    data.append("file", file);
    data.append("upload_preset", "image_preset");
  }

  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
    const resourceType = "image";
    const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const res = await axios.post(api, data);
    const { secure_url } = res.data;
    return secure_url;
  } catch (error) {
    console.error(error.message);
    throw error; // Rethrow the error so the caller can handle it
  }
}

export default uploadImageToCloudinary;
