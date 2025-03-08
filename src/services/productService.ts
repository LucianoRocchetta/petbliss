import { Product } from "@/types";

export const getProducts = async () => {
    const res = await fetch("/api/products");
    if(!res.ok) {
        throw new Error("Failed to fetch products");
    }
    return await res.json();
}

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
        throw new Error("Failed to delete");
    }

    return await res.json();
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

export const updateProductById = async (newData: Product) => {
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