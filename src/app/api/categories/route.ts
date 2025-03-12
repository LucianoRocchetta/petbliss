import { connectDB } from "@/libs/mongoose";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import category from "@/models/category";

export async function GET () {
    await connectDB();

    const categories = await category.find();
    return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData(); 

        const name = formData.get("name");
        const image = formData.get("image") as File;

        if (!name ||  !image) {
            return NextResponse.json({ error: 'Missing required fields to create the category.' }, { status: 400 });
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
        const newCategory = new category({
            name,
            imageURL,
        });
        await newCategory.save();

        return NextResponse.json({ message: 'Category successfully created', product: newCategory}, { status: 201 });
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json({ error: 'Error creating category on the server.' }, { status: 500 });
    }
}