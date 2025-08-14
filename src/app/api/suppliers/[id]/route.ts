import { isAdmin } from "@/lib/authUtils";
import connectDB from "@/lib/mongoose";
import supplier from "@/models/supplier";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: {params: {id: string}}) {
    try {
        const auth = await isAdmin(request);
        
                if (!auth.authorized) {
                    return NextResponse.json({ error: auth.error }, { status: auth.status });
                }

        await connectDB();

        const { id } = params
    
        if(!id) return NextResponse.json({message: "Supplier ID is required"}, {status: 400})
    
        const deletedSupplier = await supplier.findByIdAndDelete(id);
    
        if(!deletedSupplier) return NextResponse.json({message: "Supplier not found"}, {status: 404})
    
        return NextResponse.json({message: "Supplier deleted successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Error deleting Supplier by ID", error}, {status: 500})
    }
    
}