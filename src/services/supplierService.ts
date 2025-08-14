export const getSuppliers = async () => {
    try {
        const response = await fetch("/api/suppliers");
        if (!response.ok) throw new Error("Failed to fetch suppliers");
        return await response.json();
    }
    catch (error) {
        throw error;
    }  
}

export const createSupplier = async (formData: FormData) => {
    try {
        const response = await fetch("/api/suppliers", {
            method: "POST",
            body: formData
        })
        if (!response.ok) throw new Error("Failed to create supplier");
        return await response.json();
    }
    catch (error) {
        throw error;
    }   
}

export const deleteSupplierById = async (id: string) => {
    try {
        const response = await fetch(`/api/suppliers/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete supplier");
        return await response.status;
    }
    catch (error) {
        throw error;
    }   
}

export const getSuppliersNames = async () => {
    const res = await fetch("/api/suppliers/metadata");

    if(!res.ok) {
        throw new Error("Failed to fetch suppliers names")
    }
    return await res.json();
}