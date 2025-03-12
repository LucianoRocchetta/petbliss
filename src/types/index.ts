export type Product = {
    _id?: string;
    name: string;
    price: number;
    stock: number;
    category: {
        _id?: string;
        name: string;
        imageURL: string;
    }
    imageURL: string;
    description?: string;
}

export type Category = {
    _id?: string;
    name: string;
    imageURL: string;
}