export type Product = {
    _id?: string;
    brand: Brand;
    name: string;
    price: number;
    discountedPrice: number;
    cost: number;
    available: boolean;
    profit: number;
    onSale: boolean;
    discount: number;
    category: Category;
    imageURL: string;
    byOrder: boolean;
    description?: string;
}

export type ProductDTO = {
    _id?: string;
    name: string;
    brand: string;
    cost: number;
    available: boolean;
    discount: number;
    profit: number;
    onSale: boolean;
    byOrder: boolean;
    category: string;
    imageURL: string;
    description?: string;
}

export type CartItem = {
    product: Product,
    quantity: number;
}

export type Brand = {
    _id?: string;
    name: string;
    slug?: string;
    imageURL: string;
}

export type Category = {
    _id?: string;
    name: string;
    imageURL: string;
}