import connectDB from "@/lib/mongoose";
import brand from "@/models/brand";
import { NextResponse } from "next/server";

export async function GET () {
    await connectDB();

    const brands = await brand.find({}, "name").lean();
    return NextResponse.json(brands);
}