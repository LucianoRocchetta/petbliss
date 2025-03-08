import { StaticImageData } from "next/image";

export type Product = {
    name: string;
    price: number;
    stock: number;
    category: string;
    imageURL: string;
    description?: string;
}

export type Category = {
    id: number;
    title: string;
    image: string;
}