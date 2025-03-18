export type Product = {
    _id?: string;
    name: string;
    price: number;
    available: boolean;
    category: {
        _id?: string;
        name: string;
        imageURL: string;
    }
    imageURL: string;
    byOrder: boolean;
    description?: string;
}

export type ProductDTO = {
    _id?: string;
    name: string;
    price: number;
    available: boolean;
    byOrder: string;
    category: string;
    imageURL: string;
    description?: string;
}

export type CartItem = {
    product: Product,
    quantity: number;
}

export type Category = {
    _id?: string;
    name: string;
    imageURL: string;
}