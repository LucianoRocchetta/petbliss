import { connectDB } from "@/lib/mongoose";
import category from "@/models/category";
import { NextResponse } from "next/server";

export async function GET () {
    await connectDB();

    const categories = await category.find({}, "name").lean();
    return NextResponse.json(categories);
}