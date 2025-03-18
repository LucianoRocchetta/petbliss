import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongoose";
import product from "@/models/product";
import fs from "fs";
import path from "path";
import category from "@/models/category";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const keyword = searchParams.get("keyword");
        const categoryParam = searchParams.get("category");
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "8", 10);
        const skip = (page - 1) * limit;

        const query: any = {};

        if (keyword) {
            query.name = { $regex: keyword, $options: "i" };
        }

        if (categoryParam) {
            const productCategory = await category.findOne({ name: categoryParam });

            if (productCategory) {
                query.category = productCategory._id;
            } else {
                return NextResponse.json({ products: [], total: 0, totalPages: 0 }, { status: 200 });
            }
        }

        const products = await product.find(query)
            .populate("category")
            .skip(skip)
            .limit(limit);

        const total = await product.countDocuments(query);

        return NextResponse.json({
            products,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
    }
}


export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData(); 

        const name = formData.get("name");
        const price = formData.get("price");
        const description = formData.get("description");
        const categoryParam = formData.get("category");
        const available = formData.get("available") === "true"
        const image = formData.get("image") as File;
        const byOrder = formData.get("byOrder") === "true"

        if (!name || !price || !description || !categoryParam || available === null || !image || byOrder === null) {
            return NextResponse.json({ error: 'Missing required fields to create the product.' }, { status: 400 });
        }

        if (typeof name !== 'string' || typeof description !== 'string' || typeof categoryParam !== 'string') {
            return NextResponse.json({ error: 'Invalid data types for name, description, or category.' }, { status: 400 });
        }

        if (typeof price !== 'string') { 
            return NextResponse.json({ error: 'Price should be a number.' }, { status: 400 });
        }

        const productCategory = await category.findOne({name: categoryParam})

        if (!productCategory) {
            return NextResponse.json({ error: "Invalid category" }, { status: 400 });
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
        const newProduct = new product({
            name,
            price: parseFloat(price),
            description,
            category: productCategory._id,
            available: available,
            byOrder: byOrder,
            imageURL,
        });
        await newProduct.save();

        return NextResponse.json({ message: 'Product successfully created', product: newProduct }, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Error creating product on the server.' }, { status: 500 });
    }
}

export async function DELETE () {
    try {
        await connectDB();
        const products = await product.deleteMany();
        return NextResponse.json({ message: 'Products successfully deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting products on the server.' }, { status: 500 });
    }
    
}