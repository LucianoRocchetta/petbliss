import { connectDB } from "@/lib/mongoose";
import brand from "@/models/brand";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: {params: {id: string}}) {
    try {
        await connectDB();

        const { id } = params
    
        if(!id) return NextResponse.json({message: "Brand ID is required"}, {status: 400})
    
        const deletedBrand = await brand.findByIdAndDelete(id);
    
        if(!deletedBrand) return NextResponse.json({message: "Brand not found"}, {status: 404})
    
        return NextResponse.json({message: "Brand deleted successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Error deleting Brand by ID", error}, {status: 500})
    }
    
}