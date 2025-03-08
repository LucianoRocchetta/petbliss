import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if(!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

export const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("Using existing database connection");
            return;
        }
        await mongoose.connect(MONGODB_URI,);
        console.log("Database connected");
    } catch (error) {
        process.exit(1);
    }
}
