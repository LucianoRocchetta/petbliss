"use client"

import { getCategories } from "@/services/categoryService";
import { Category } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  
      useEffect(() => {
          const getAllCategories = async () => {
              try {
                  const res = await getCategories();
  
                  setCategories(res)
      
              } catch (error) {
                  console.error(error)
              }
  
          }
          getAllCategories();
      }, [])

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">Categorias</h2>
          <button className="border rounded-2xl p-2">Ver más categorias</button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {categories.map((category) => (
          <Link href={`/shop?category=${category.name}`}
            key={category._id}
            className="bg-slate-50 rounded-2xl h-40 relative overflow-hidden flex items-center p-5"
            style={{
              backgroundImage: `linear-gradient(to bottom, #2193b0, #6dd5ed)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <h2 className="text-2xl text-white font-bold z-50">{category.name}</h2>
            <Image
              src={category.imageURL}
              alt={category.name}
              width={150}
              height={150}
              className="absolute bottom-0 right-0"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
