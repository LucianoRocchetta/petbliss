export const createBrand = async (formData: FormData) => {
    try {
        const response = await fetch("/api/brands", {
            method: "POST",
            body: formData
        })
        if (!response.ok) throw new Error("Failed to create brand");
        return await response.json();
    }
    catch (error) {
        throw error;
    }   
}

export const getBrands = async () => {
    try {
        const response = await fetch("/api/brands");
        if (!response.ok) throw new Error("Failed to fetch brands");
        return await response.json();
    }
    catch (error) {
        throw error;
    }  
}

export const deleteBrandById = async (id: string) => {
    try {
        const response = await fetch(`/api/brands/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete brand");
        return await response.status;
    }
    catch (error) {
        throw error;
    }   
}

export const getBrandNames = async () => {
    const res = await fetch("/api/brands/metadata");

    if(!res.ok) {
        throw new Error("Failed to fetch brand names")
    }
    return await res.json();
}
