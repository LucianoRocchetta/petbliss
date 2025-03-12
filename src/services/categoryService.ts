export const createCategory = async (formData: FormData) => {
    try {
        const res = await fetch("/api/categories", {
            method: "POST",
            body: formData
        })
    
        if(!res.ok) {
            throw new Error("Failed to create category") 
        }

        return await res.status;
    } catch (error) {
        throw error;
    }
}

export const getCategories = async () => {
    const res = await fetch("/api/categories");
    if(!res.ok) {
        throw new Error("Failed to fetch categories");
    }
    return await res.json();
}

export const deleteCategoryById = async (categoryId: string) => {
    const res = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE"
    })

    if(!res.ok) {
        throw new Error("Failed to delete category by ID")
    }

    return await res.json();
}