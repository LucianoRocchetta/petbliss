import connectDB from "@/lib/mongoose";
import brand from "@/models/brand";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { isAdmin } from "@/lib/auth";

export async function GET () {
    await connectDB();

    const brands = await brand.find();
    return NextResponse.json(brands);
}

export async function POST(req: NextRequest) {
    try {
      const auth = await isAdmin(req);
      
              if (!auth.authorized) {
                  return NextResponse.json({ error: auth.error }, { status: auth.status });
              }

      const formData = await req.formData();
      const name = formData.get("name");
      const image = formData.get("image") as File;
  
      if (!name || !image) {
        return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
      }
  
      if (typeof name !== "string") {
        return NextResponse.json({ error: "Invalid data type for name" }, { status: 400 });
      }
  
      await connectDB();
  
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
  
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "brands", resource_type: "image" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        ).end(buffer);
      });
  
      const imageUrl = (uploadResult as any).secure_url;
  
      const newBrand = new brand({ name, imageURL: imageUrl, slug: name.toLowerCase().replace(/ /g, "-") });
      await newBrand.save();
  
      return NextResponse.json(
        { message: "Brand successfully created", brand: newBrand },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error creating brand:", error);
      return NextResponse.json({ error: "Error creating brand on the server." }, { status: 500 });
    }
  }
  