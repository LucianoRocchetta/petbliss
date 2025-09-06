"use client";

import { Brand } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getBrands } from "@/services/brandService";
import { BrandsCardSkeleton } from "@/components/shared/brandsCardSkeleton";
import Pagination from "@/components/shared/pagination";

export default function Brands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(8);

  useEffect(() => {
    setIsLoading(true);
    const getAllBrands = async () => {
      try {
        const res = await getBrands();
        setBrands(res);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getAllBrands();
  }, []);

  const indexOfLastBrand = page * limit;
  const indexOfFirstBrand = indexOfLastBrand - limit;
  const currentBrands = brands.slice(indexOfFirstBrand, indexOfLastBrand);
  const totalPages = Math.ceil(brands.length / limit);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">Marcas</h2>
      <div className="grid grid-cols-2 lg:grid-cols-8 gap-4">
        {!isLoading
          ? currentBrands.map((brand) => (
              <Link key={brand._id} href={`/shop?brand=${brand.slug}`} passHref>
                <motion.div
                  whileHover={{
                    scale: 1.01,
                    y: -5,
                    boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  className="rounded-2xl h-40 relative overflow-hidden flex items-center justify-center p-5 bg-zinc-700"
                >
                  <div className="absolute inset-0 bg-zinc-800 opacity-10"></div>
                  <Image
                    src={brand.imageURL}
                    alt={brand.name}
                    width={200}
                    height={200}
                    className=""
                  />
                </motion.div>
              </Link>
            ))
          : Array(8)
              .fill(null)
              .map((_, index) => <BrandsCardSkeleton key={index} />)}
      </div>

      {!isLoading && (
        <div className="flex items-center justify-center lg:justify-end">
          <Pagination
            page={page}
            onPageChange={setPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </section>
  );
}
