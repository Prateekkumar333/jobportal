import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (fileBuffer, options = {}) => {
  try {
    const params = {
      resource_type: "image",
      folder: "job_portal",
      ...options,
    };
    console.log("Upload params:", params);

    return await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(params, (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", {
              message: error.message,
              name: error.name,
              http_code: error.http_code,
              details: error,
            });
            reject(new Error(`Cloudinary error: ${error.message}`));
          } else {
            console.log("Cloudinary upload success:", {
              secure_url: result.secure_url,
              public_id: result.public_id,
            });
            resolve(result);
          }
        })
        .end(fileBuffer);
    });
  } catch (error) {
    console.error("UploadImage error:", error);
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Cloudinary delete success:", result);
    return result;
  } catch (error) {
    console.error("DeleteImage error:", error);
    throw new Error(`Cloudinary deletion failed: ${error.message}`);
  }
};

export default cloudinary;
