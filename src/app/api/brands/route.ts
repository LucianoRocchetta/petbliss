import { connectDB } from "@/lib/mongoose";
import brand from "@/models/brand";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET () {
    await connectDB();

    const brands = await brand.find();
    return NextResponse.json(brands);
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData(); 

        const name = formData.get("name");
        const image = formData.get("image") as File;

        if (!name ||  !image) {
            return NextResponse.json({ error: 'Missing required fields to create the brand.' }, { status: 400 });
        }

        if (typeof name !== 'string') {
            return NextResponse.json({ error: 'Invalid data type for name' }, { status: 400 });
        }

        await connectDB();

        const uploadDir = path.join(process.cwd(), "public/images");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const imageName = image.name;
        const filePath = path.join(uploadDir, imageName);
        const buffer = await image.arrayBuffer();
        fs.writeFileSync(filePath, Buffer.from(buffer));

        const imageURL = `/images/${imageName}`;
        const newBrand = new brand({
            name,
            imageURL,
        });
        await newBrand.save();

        return NextResponse.json({ message: 'Brand successfully created', product: newBrand}, { status: 201 });
    } catch (error) {
        console.error('Error creating brand:', error);
        return NextResponse.json({ error: 'Error creating brand on the server.' }, { status: 500 });
    }
}