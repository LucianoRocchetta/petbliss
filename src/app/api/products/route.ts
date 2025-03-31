import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongoose";
import product from "@/models/product";
import category from "@/models/category";
import brand from "@/models/brand";
import cloudinary from "@/lib/cloudinary";

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const keyword = searchParams.get("keyword");
        const categoryParam = searchParams.get("category");
        const page = parseInt(searchParams.get("page") || "1", 10);
        const brandParam = searchParams.get("brand");
        const sortBy = searchParams.get("sortBy") || "price";
        const order  = searchParams.get("order") === "desc" ? -1 : 1;
        const limit = parseInt(searchParams.get("limit") || "8", 10);
        const skip = (page - 1) * limit;

        const query: any = {};

        if (keyword) {
            query.name = { $regex: keyword, $options: "i" };
        }

        if (brandParam) {
            const productBrand = await brand.findOne({ name: brandParam });
        
            if (productBrand) {
                query.brand = productBrand._id;
            } else {
                return NextResponse.json({ products: [], total: 0, totalPages: 0 }, { status: 200 });
            }
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
            .populate("brand")
            .skip(skip)
            .sort({ [sortBy]: order})
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
        const cost = parseInt(formData.get("cost") as string);
        const profit = parseInt(formData.get("profit") as string);
        const discount = parseInt(formData.get("discount") as string);
        const description = formData.get("description");
        const categoryParam = formData.get("category");
        const available = formData.get("available") === "true"
        const onSale = formData.get("onSale") === "true";
        const brandParam = formData.get("brand");
        const image = formData.get("image") as File;
        const byOrder = formData.get("byOrder") === "true"

        if (!name || !cost || !description || !categoryParam || available === null || !image || byOrder === null || !brandParam || !profit || onSale === null) {
            return NextResponse.json({ error: 'Missing required fields to create the product.' }, { status: 400 });
        }

        if (typeof name !== 'string' || typeof description !== 'string' || typeof categoryParam !== 'string' || typeof brandParam !== 'string') {
            return NextResponse.json({ error: 'Invalid data types for name, description, brand or category.' }, { status: 400 });
        }

        if (isNaN(cost) || cost <= 0) { 
            return NextResponse.json({ error: 'cost should be a valid positive number.' }, { status: 400 });
        }

        if (isNaN(discount) || discount < 0) { 
            return NextResponse.json({ error: 'discount should be a valid positive number.' }, { status: 400 });
        }

        if (isNaN(profit) || profit <= 0) { 
            return NextResponse.json({ error: 'profit should be a valid positive number.' }, { status: 400 });
        }

        const productCategory = await category.findOne({name: categoryParam})

        if (!productCategory) {
            return NextResponse.json({ error: "Invalid category" }, { status: 400 });
        }        

        const productBrand = await brand.findOne({name: brandParam})

        if (!productBrand) {
            return NextResponse.json({ error: "Invalid brand" }, { status: 400 });
        }     

        await connectDB();

        const price = cost * (1 + profit / 100)
        const discountedPrice = price * (1 - discount / 100)

        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
          
              const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                  { folder: "products", resource_type: "image" },
                  (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                  }
                ).end(buffer);
              });
          
              const imageUrl = (uploadResult as any).secure_url;

        const newProduct = new product({
            name,
            cost: cost,
            discount: discount,
            onSale: onSale,
            price: price,
            discountedPrice: discountedPrice,
            profit: profit,
            description,
            category: productCategory._id,
            brand: productBrand._id,
            available: available,
            byOrder: byOrder,
            imageURL: imageUrl,
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