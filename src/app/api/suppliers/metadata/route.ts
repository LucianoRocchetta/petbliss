import connectDB from "@/lib/mongoose";
import supplier from "@/models/supplier";
import { NextResponse } from "next/server";

export async function GET () {
    await connectDB();

    const suppliers = await supplier.find({}, "name").lean();
    return NextResponse.json(suppliers);
}