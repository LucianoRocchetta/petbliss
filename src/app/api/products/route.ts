import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongoose";
import product from "@/models/product";
import category from "@/models/category";
import brand from "@/models/brand";
import cloudinary from "@/lib/cloudinary";
import { isAdmin } from "@/lib/authUtils";
import { ProductVariantDTO } from "@/types";

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
            const productBrand = await brand.findOne({ slug: brandParam });
        
            if (productBrand) {
                query.brand = productBrand._id;
            } else {
                return NextResponse.json({ products: [], total: 0, totalPages: 0 }, { status: 200 });
            }
        }

          const isFeaturedParam = searchParams.get("isFeatured");
          if (isFeaturedParam !== null) {
            query.isFeatured = isFeaturedParam === "true";
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
      const auth = await isAdmin(request);
      if (!auth.authorized) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
      }
  
      await connectDB();
  
      const formData = await request.formData();

      const name = formData.get("name")?.toString();
      const description = formData.get("description")?.toString();
      const categoryParam = formData.get("category")?.toString();
      const brandParam = formData.get("brand")?.toString();
      const available = formData.get("available") === "true";
      const byOrder = formData.get("byOrder") === "true";
      const isFeatured = formData.get("isFeatured") === "true";
  
      const variantsJSON = formData.get("variants")?.toString();
      const image = formData.get("image") as File;
  
      if (!name || !description || !categoryParam || !brandParam || !variantsJSON || !image) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
      }
  
      const parsedVariants = JSON.parse(variantsJSON);
      if (!Array.isArray(parsedVariants) || parsedVariants.length === 0) {
        return NextResponse.json({ error: "Las variantes deben ser un array no vacío" }, { status: 400 });
      }
  
      const productCategory = await category.findOne({ name: categoryParam });
      if (!productCategory) {
        return NextResponse.json({ error: "Categoría inválida" }, { status: 400 });
      }
  
      const productBrand = await brand.findOne({ name: brandParam });
      if (!productBrand) {
        return NextResponse.json({ error: "Marca inválida" }, { status: 400 });
      }
  
     const validatedVariants = parsedVariants.map((variant: ProductVariantDTO) => {
        const weight = Number(variant.weight);
        const cost = Number(variant.cost);
        const profit = Number(variant.profit);
        const discount = Number(variant.discount ?? 0);
        const onSale = Boolean(variant.onSale);
  
        if (
          isNaN(weight) || weight <= 0 ||
          isNaN(cost) || cost <= 0 ||
          isNaN(profit) || profit <= 0 ||
          isNaN(discount) || discount < 0
        ) {
          throw new Error("Datos inválidos en una de las variantes");
        }
  
        const price = Math.round(cost * (1 + profit / 100));
        const discountedPrice = Math.round(price * (1 - discount / 100));
  
        return {
          weight,
          cost,
          profit,
          discount,
          onSale,
          price,
          discountedPrice,
        };
      });

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
        description,
        category: productCategory._id,
        brand: productBrand._id,
        available,
        byOrder,
        isFeatured,
        imageURL: imageUrl,
        variants: validatedVariants,
      });
  
      await newProduct.save();
  
      return NextResponse.json({ message: "Producto creado correctamente", product: newProduct }, { status: 201 });
  
    } catch (error: any) {
      console.error("Error creando producto:", error);
      return NextResponse.json({ error: error.message || "Error del servidor" }, { status: 500 });
    }
  }