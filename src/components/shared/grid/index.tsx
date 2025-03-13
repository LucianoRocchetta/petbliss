"use client"

import { Product } from "@/types";
import { useEffect, useState } from "react";
import { getProducts, getProductsByCategory, getProductsByKeyword } from "@/services/productService";
import { ProductCard } from "../productCard";
import { ProductCardAdmin } from "@/components/admin";
import { useSession } from "next-auth/react";
import product from "@/models/product";
import Pagination from "../pagination";

type GridProps = {
    columns: number;
    keyword?: string;
    category?: string;
}

export const Grid = ({columns, keyword, category}: GridProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const {data: session, status} = useSession();
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts({ page, keyword, category });

                if (response) {
                    setProducts(response.products);
                    setTotalPages(response.totalPages);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, [page, keyword, category]);

    return (
        <>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-4 mb-5`}>
            {
    products.map((product) => {
        return session?.user.role === "admin" 
            ? <ProductCardAdmin key={product.name} product={product} />
            : <ProductCard key={product.name} product={product} />;
    })

    
}
        </div>
        {
            !(totalPages === 1) ? <Pagination page={page} totalPages={totalPages} onPageChange={setPage}/> : ""
        }
        
        </>
    )
}