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
        return NextResponse.json(
          { products: [], total: 0, totalPages: 0 },
          { status: 200 }
        );
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
        return NextResponse.json(
          { products: [], total: 0, totalPages: 0 },
          { status: 200 }
        );
      }
    }

    const products = await product
      .find(query)
      .populate("category")
      .populate("brand")
      .skip(skip)
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
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
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
    const productType = formData.get("productType")?.toString() || "other";
    const targetAnimal = formData.get("targetAnimal")?.toString() || "all";
    const available = formData.get("available") === "true";
    const byOrder = formData.get("byOrder") === "true";
    const isFeatured = formData.get("isFeatured") === "true";

    const variantsJSON = formData.get("variants")?.toString();
    const image = formData.get("image") as File;

    console.log("\n📥 [API POST] Datos recibidos:");
    console.log("   - name:", name);
    console.log("   - productType:", productType);
    console.log("   - targetAnimal:", targetAnimal);
    console.log("   - variantsJSON length:", variantsJSON?.length || 0);

    if (
      !name ||
      !description ||
      !categoryParam ||
      !brandParam ||
      !variantsJSON ||
      !image
    ) {
      console.error("❌ [API POST] Faltan campos obligatorios");
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const parsedVariants = JSON.parse(variantsJSON);
    console.log("📋 [API POST] Variantes parseadas:", parsedVariants.length, "variante(s)");
    
    if (!Array.isArray(parsedVariants) || parsedVariants.length === 0) {
      console.error("❌ [API POST] Las variantes no son un array válido o está vacío");
      return NextResponse.json(
        { error: "Las variantes deben ser un array no vacío" },
        { status: 400 }
      );
    }

    parsedVariants.forEach((v: any, idx: number) => {
      console.log(`   - Variante ${idx + 1}:`, v);
    });

    const productCategory = await category.findOne({ name: categoryParam });
    if (!productCategory) {
      return NextResponse.json(
        { error: "Categoría inválida" },
        { status: 400 }
      );
    }

    const productBrand = await brand.findOne({ name: brandParam });
    if (!productBrand) {
      return NextResponse.json({ error: "Marca inválida" }, { status: 400 });
    }

    // Las variantes ya vienen con el formato correcto del frontend
    const validatedVariants = parsedVariants;

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "products", resource_type: "image" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });
    const imageUrl = (uploadResult as any).secure_url;

    const newProduct = new product({
      productType,
      targetAnimal,
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

    console.log("💾 [API POST] Guardando producto...");
    console.log("   - Nombre:", newProduct.name);
    console.log("   - Tipo:", newProduct.productType);
    console.log("   - Variantes a guardar:", newProduct.variants);

    await newProduct.save();

    console.log("✅ [API POST] Producto guardado exitosamente");
    console.log("   - ID:", newProduct._id);
    console.log("   - Variantes guardadas:", newProduct.variants);

    return NextResponse.json(
      { message: "Producto creado correctamente", product: newProduct },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creando producto:", error);
    return NextResponse.json(
      { error: error.message || "Error del servidor" },
      { status: 500 }
    );
  }
}
