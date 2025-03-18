import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product"
import { connectDB } from "@/lib/mongoose";
import product from "@/models/product";
import mongoose from "mongoose";
import category from "@/models/category";

export async function DELETE(request: NextRequest, { params }: {params: {id: string}}) {
    try {
        await connectDB();

        const { id } = params
    
        if(!id) return NextResponse.json({message: "Product ID is required"}, {status: 400})
    
        const deletedProduct = await Product.findByIdAndDelete(id);
    
        if(!deletedProduct) return NextResponse.json({message: "Product not found"}, {status: 404})
    
        return NextResponse.json({message: "Product deleted successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Error deleting product by ID", error}, {status: 500})
    }
    
}

export async function PUT(req: Request, {params}: {params: {id: string}}) {
    try {
        await connectDB();

        const { id } = params
        const data = await req.json();

        const productToModify = await product.findById(id);

        if(!productToModify) {
            return NextResponse.json({error: "Product not found"}, {status: 404});
        }

        if(data.category) {
            const categoryDoc = await category.findOne({ name: data.category });

            if (!categoryDoc) {
                return NextResponse.json({ error: "Category not found" }, { status: 404 });
            }

            data.category = categoryDoc._id;
        }

        data.available = data.available == "true"

        const updatedProduct = await product.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        }).populate("category")
        return NextResponse.json(updatedProduct, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}