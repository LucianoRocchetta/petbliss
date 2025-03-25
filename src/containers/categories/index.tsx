"use client";

import { CategoriesCardSkeleton } from "@/components/shared";
import { getCategories } from "@/services/categoryService";
import { Category } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const getAllCategories = async () => {
      try {
        const res = await getCategories();

        setCategories(res);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getAllCategories();
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">Categorias</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {!isLoading
          ? categories.map((category) => (
              <Link
                key={category._id}
                href={`/shop?category=${category.name}`}
                passHref
              >
                <motion.div
                  whileHover={{
                    scale: 1.01,
                    y: -5,
                    boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  className="rounded-2xl h-40 relative overflow-hidden flex items-center p-5 bg-zinc-900"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, #505050, #434343)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-zinc-800 opacity-30"></div>
                  <h2 className="text-2xl text-zinc-200 font-bold z-30">
                    {category.name}
                  </h2>
                  <Image
                    src={category.imageURL}
                    alt={category.name}
                    width={150}
                    height={150}
                    className="absolute bottom-0 right-0"
                  />
                </motion.div>
              </Link>
            ))
          : Array(4)
              .fill(null)
              .map((_, index) => <CategoriesCardSkeleton key={index} />)}
      </div>
    </section>
  );
}
