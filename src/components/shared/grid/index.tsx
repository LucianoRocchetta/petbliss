"use client";

import { Product } from "@/types";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import { ProductCard } from "../productCard";
import { ProductCardAdmin } from "@/components/admin";
import { ProductCardSkeleton } from "../productCardSkeleton";
import { useSession } from "next-auth/react";
import Pagination from "../pagination";

type GridProps = {
  columns: number;
  keyword?: string;
  category?: string;
  brand?: string;
  limit?: number;
  isFeatured?: boolean;
  pagination?: boolean;
  order?: string;
  sortBy?: string;
};

export const Grid = ({
  columns,
  keyword,
  category,
  limit,
  order,
  sortBy,
  brand,
  isFeatured,
  pagination = true,
}: GridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const { data: session, status } = useSession();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    setPage(1);
  }, [keyword, category, brand, sortBy, order]);

  useEffect(() => {
    setIsLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await getProducts({
          keyword,
          category,
          limit,
          order,
          brand,
          sortBy,
          isFeatured,
          page,
        });

        if (response) {
          setProducts(response.products);
          setTotalPages(response.totalPages);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [page, keyword, category, order, sortBy, brand, isFeatured]);

  return (
    <>
      {isLoading ? (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-4 mb-5`}
        >
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
        </div>
      ) : (
        <>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-4 mb-5`}
          >
            {products.length > 0 ? (
              products
                .slice(0, limit)
                .map((product: Product) =>
                  session?.user.role === "admin" ? (
                    <ProductCardAdmin key={product.name} product={product} />
                  ) : (
                    <ProductCard key={product.name} product={product} />
                  )
                )
            ) : (
              <p>No hay productos disponibles</p>
            )}
          </div>
          {pagination && totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </>
  );
};
