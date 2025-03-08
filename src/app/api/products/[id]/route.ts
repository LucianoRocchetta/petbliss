import { NextResponse } from "next/server";
import Product from "@/models/product"
import { connectDB } from "@/libs/mongoose";
import product from "@/models/product";

export async function PUT(req: Request, {params}: {params: {id: string}}) {
    try {
        await connectDB();

        const { id } = params
        const data = await req.json();

        const productToModify = await product.findById(id);

        if(!productToModify) {
            return NextResponse.json({error: "Product not found"}, {status: 404});
        }

        const updatedProduct = await product.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        })
        return NextResponse.json(updatedProduct, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}