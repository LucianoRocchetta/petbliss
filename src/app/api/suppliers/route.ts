import connectDB from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/authUtils";
import supplier from "@/models/supplier";

export async function GET () {
    await connectDB();

    const suppliers = await supplier.find();
    return NextResponse.json(suppliers);
}

export async function POST(req: NextRequest) {
    try {
      const auth = await isAdmin(req);
      
              if (!auth.authorized) {
                  return NextResponse.json({ error: auth.error }, { status: auth.status });
              }

      const formData = await req.formData();
      const name = formData.get("name");
  
      if (!name) {
        return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
      }
  
      if (typeof name !== "string") {
        return NextResponse.json({ error: "Invalid data type for name" }, { status: 400 });
      }
  
      await connectDB();
  
      const newSupplier = new supplier({ name });
      await newSupplier.save();
  
      return NextResponse.json(
        { message: "Supplier successfully created", supplier: newSupplier },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error creating supplier:", error);
      return NextResponse.json({ error: "Error creating supplier on the server." }, { status: 500 });
    }
  }
  