import { ProductDTO } from "@/types";

type SearchProps = {
    page: number;
    keyword?: string,
    category?: string,
    brand?: string,
    limit?: number,
    order?: string, 
    isFeatured?: boolean,
    sortBy?: string,
}

export const getProducts = async ({ brand, order, isFeatured, sortBy, page = 1, keyword = "", category = "", limit=8  }: SearchProps) => {
    try {
        const queryParams = new URLSearchParams({
            page: page.toString(),
            ...(keyword && { keyword }),
            ...(category && { category }),
            limit: limit.toString(),
            ...(order && { order }),
            ...(sortBy && {sortBy}),
            ...(brand && {brand}),
            ...(isFeatured && { isFeatured: isFeatured.toString() })
        }).toString();

        const res = await fetch(`/api/products?${queryParams}`);
        if (!res.ok) throw new Error("Failed to fetch products");

        return await res.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        return { products: [], totalPages: 1 };
    }
};

export const createProduct = async (formData: FormData) => {
    try {
        const res = await fetch("/api/products", {
            method: "POST",
            body: formData
        })
    
        if(!res.ok) {
            throw new Error("Failed to create product") 
        }

        return await res.status;
    } catch (error) {
        throw error;
    }
}

export const deleteAllProducts = async () => {
    const res = await fetch("/api/products", {
        method: "DELETE"
    });

    if (!res.ok) {
        throw new Error("Failed to delete all products");
    }

    return await res.json();
}

export const deleteProductById = async (productId: string) => {
    const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE"
    })

    if(!res.ok) {
        throw new Error(`Failed to delete product ${productId}`)
    }

    return await res.status;
}

export const getProductsByKeyword = async (keyword: string) => {
    const res = await fetch(`/api/products?keyword=${keyword}`);

    if(!res.ok) {
        throw new Error("Failed to fetch products by keyword");
    }

    return await res.json();
}

export const getProductsByCategory = async (category: string) => {
    const res = await fetch(`/api/products?category=${category}`)

    if(!res.ok) {
        throw new Error("Failed to fetch products by category");
    }

    return await res.json();
}

export const updateProductById = async (newData: ProductDTO) => {
    const res = await fetch(`/api/products/${newData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
    });

    if (!res.ok) {
        throw new Error("Error updating product");
    }

    return await res.json();
}