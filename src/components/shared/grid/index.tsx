"use client"

import { Product } from "@/types";
import { useEffect, useState } from "react";
import { getProducts, getProductsByCategory, getProductsByKeyword } from "@/services/productService";
import { ProductCard } from "../productCard";
import { ProductCardAdmin } from "@/components/admin";

type GridProps = {
    columns: number;
    keyword?: string;
    category?: string;
}

export const Grid = ({columns, keyword, category}: GridProps) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let products: Product[] = []

                if(category) {
                    products = await getProductsByCategory(category)
                    setProducts(products)
                    return;
                }
                if(keyword) {
                    products = products = await getProductsByKeyword(keyword);
                    setProducts(products)
                    return;
                }
                
                products = await getProducts();
                setProducts(products);
            } catch (error) {
                console.error(error);
            }
        }
            fetchProducts();
    }, [keyword, category])

    return (
        <div className={`grid grid-cols-${columns} gap-4`}>
            {
                products.map((product) => <ProductCardAdmin key={product.name} product={product} />)
            }
        </div>
    )
}