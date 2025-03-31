import connectDB from "@/lib/mongoose";
import category from "@/models/category";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: {params: {id: string}}) {
    try {
        await connectDB();

        const { id } = params
    
        if(!id) return NextResponse.json({message: "Category ID is required"}, {status: 400})
    
        const deletedCategory = await category.findByIdAndDelete(id);
    
        if(!deletedCategory) return NextResponse.json({message: "Category not found"}, {status: 404})
    
        return NextResponse.json({message: "Category deleted successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Error deleting Category by ID", error}, {status: 500})
    }
    
}
