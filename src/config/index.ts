export { default as cloudinaryConfig } from './cloudinary.config';
export { default as mongoDbConfig } from './mongoDb.config';

const {
    NODE_ENV,
    NEXTAUTH_SECRET,
} = process.env;

export default {
    nodeEnv: NODE_ENV || "development",
    nextAuthSecret: NEXTAUTH_SECRET || "",
}