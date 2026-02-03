const {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env;

export default {
    cloudinaryCloudName: CLOUDINARY_CLOUD_NAME || "",
    cloudinaryApiKey: CLOUDINARY_API_KEY || "",
    cloudinaryApiSecret: CLOUDINARY_API_SECRET || "",
}