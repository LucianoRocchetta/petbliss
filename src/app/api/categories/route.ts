import connectDB from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import category from "@/models/category";
import cloudinary from "@/lib/cloudinary";
import { isAdmin } from "@/lib/authUtils";

export async function GET () {
    await connectDB();

    const categories = await category.find();
    return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
    try {
        const auth = await isAdmin(request);
        
                if (!auth.authorized) {
                    return NextResponse.json({ error: auth.error }, { status: auth.status });
                }

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

        const arrayBuffer = await image.arrayBuffer();
              const buffer = Buffer.from(arrayBuffer);
          
              const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                  { folder: "categories", resource_type: "image" },
                  (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                  }
                ).end(buffer);
              });
        const imageUrl = (uploadResult as any).secure_url;

        const newCategory = new category({
            name,
            imageURL: imageUrl,
        });
        await newCategory.save();

        return NextResponse.json({ message: 'Category successfully created', product: newCategory}, { status: 201 });
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json({ error: 'Error creating category on the server.' }, { status: 500 });
    }
}