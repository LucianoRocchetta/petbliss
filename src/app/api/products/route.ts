import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/libs/mongoose";
import product from "@/models/product";
import fs from "fs";
import path from "path";
import category from "@/models/category";

export async function GET (request: NextRequest) {
    await connectDB();

    const { searchParams } = new URL(request.url)
    const keyword = searchParams.get('keyword');
    const categoryParam = searchParams.get('category');

    const query:any = {};

    if (keyword) {
        query.name = {
                $regex: keyword,
                $options: 'i'
            }
    }
    if (categoryParam) {
        const productCategory = await category.findOne({name: categoryParam})

        if(productCategory) {
            query.category = productCategory._id;
        } else {
            return NextResponse.json([], {status: 200});
        }
    }

    const products = await product.find(query).populate('category');
    return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData(); 

        const name = formData.get("name");
        const price = formData.get("price");
        const description = formData.get("description");
        const categoryParam = formData.get("category");
        const stock = formData.get("stock");
        const image = formData.get("image") as File;

        if (!name || !price || !description || !categoryParam || !stock || !image) {
            return NextResponse.json({ error: 'Missing required fields to create the product.' }, { status: 400 });
        }

        if (typeof name !== 'string' || typeof description !== 'string' || typeof categoryParam !== 'string') {
            return NextResponse.json({ error: 'Invalid data types for name, description, or category.' }, { status: 400 });
        }

        if (typeof price !== 'string' || typeof stock !== 'string') { 
            return NextResponse.json({ error: 'Price and stock should be numbers.' }, { status: 400 });
        }

        const productCategory = await category.findOne({name: categoryParam})

        if(!productCategory) NextResponse.json({messsage: "Invalid category", status: 400})

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
            stock: parseInt(stock),
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