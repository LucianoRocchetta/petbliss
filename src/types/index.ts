export type Product = {
    _id?: string;
    brand: Brand;
    name: string;
    variants: ProductVariant[];
    available: boolean;
    category: Category;
    imageURL: string;
    isFeatured: boolean;
    byOrder: boolean;
    description?: string;
}

export type ProductVariant = {
    weight: number;
    cost: number;
    onSale: boolean;
    discount: number;
    profit: number;
    price: number;
    discountedPrice: number;
}

export type ProductVariantDTO = {
    weight: number;
    cost: number;
    onSale: boolean;
    discount: number;
    profit: number;
}


export type ProductDTO = {
    _id?: string;
    name: string;
    brand: string;
    isFeatured: boolean;
    variants: ProductVariantDTO[];
    available: boolean;
    byOrder: boolean;
    category: string;
    imageURL: string;
    description?: string;
}

export type CartItem = {
    product: Product,
    quantity: number;
    variant: number;
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