import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product"
import connectDB from "@/lib/mongoose";
import category from "@/models/category";
import brand from "@/models/brand";
import { isAdmin } from "@/lib/authUtils";
import { ProductVariantDTO } from "@/types";

export async function DELETE(request: NextRequest, { params }: {params: {id: string}}) {
    try {
        const auth = await isAdmin(request);
        
                if (!auth.authorized) {
                    return NextResponse.json({ error: auth.error }, { status: auth.status });
                }

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

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      const auth = await isAdmin(req);
      if (!auth.authorized) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
      }
  
      await connectDB();
  
      const { id } = params;
      const data = await req.json();
  
      const productToModify = await Product.findById(id);
      if (!productToModify) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
  
      if (data.category) {
        const categoryDoc = await category.findOne({ name: data.category });
        if (!categoryDoc) {
          return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }
        data.category = categoryDoc._id;
      }
  
      if (data.brand) {
        const brandDoc = await brand.findOne({ name: data.brand });
        if (!brandDoc) {
          return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
        }
        data.brand = brandDoc._id;
      }
  
      if (Array.isArray(data.variants)) {
        data.variants = data.variants.map((variant: ProductVariantDTO) => {
          const price = Math.round(variant.cost * (1 + variant.profit / 100));
          const discountedPrice = variant.onSale
            ? Math.round(price * (1 - variant.discount / 100))
            : price;
  
          return {
            ...variant,
            price,
            discountedPrice,
          };
        });
      }
  
      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      })
        .populate('category')
        .populate('brand');
  
      return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }