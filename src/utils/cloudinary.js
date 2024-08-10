import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // File has been successfully uploaded
        console.log("File uploaded to Cloudinary", response.url);
        
        // Remove the locally saved temporary file
        fs.unlink(localFilePath, (err) => {
            if (err) console.error("Error deleting local file:", err);
        });

        return response;
    } catch (error) {
        console.log("API Key:", process.env.CLOUDINARY_API_KEY);
        console.error("Error uploading to Cloudinary:", error);
        
        // Remove the locally saved temporary file
        fs.unlink(localFilePath, (err) => {
            if (err) console.error("Error deleting local file:", err);
        });

        return null;
    }
};

export { uploadOnCloudinary };