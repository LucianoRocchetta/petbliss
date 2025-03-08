import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/libs/mongoose";
import product from "@/models/product";

export async function GET (request: NextRequest) {
    await connectDB();

    const { searchParams } = new URL(request.url)
    const keyword = searchParams.get('keyword');
    const category = searchParams.get('category');

    const query:any = {};

    if (keyword) {
        query.name = {
                $regex: keyword,
                $options: 'i'
            }
    }
    if (category) query.category = category;

    const products = await product.find(query);
    return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        if (!data.name || !data.price || !data.description || !data.imageURL || !data.category || !data.stock) {
            return NextResponse.json({ error: 'Missing required fields to create the product.' }, { status: 400 });
        }
 
        await connectDB();

        const newProduct = new product(data);

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