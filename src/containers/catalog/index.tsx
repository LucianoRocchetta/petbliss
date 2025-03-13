"use client"

import { Grid } from "@/components/shared/grid";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { useSearchParams } from "next/navigation";
import { Category } from "@/types";
import { getCategories } from "@/services/categoryService";
import Link from "next/link";

export const Catalog = () => {
    const searchParams = useSearchParams();
    const [keyword, setKeyword] = useState<string>('');
    const [categories, setCategories] = useState<string[]>([]);
    const [category, setCategory] = useState<string>(searchParams.get("category") || "");

    useEffect(() => {
        const fetchCategories = async () => {
        try {
                const res: Category[] = await getCategories();

                const categoriesNames = res.map((category) => (category as Category).name)
                setCategories(categoriesNames);
            }
         catch (error) {
            console.log("Failed to fetch categories");
        }}

        fetchCategories();
    }, [])

    const handleCategory = (category: string) => {
        if(category) setCategory(category)
    }

    const handleKeywordChange = useCallback(
        debounce((value: string) => {
            setKeyword(value);
        }, 1000), []
    )

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleKeywordChange(e.target.value);
    }

    return (
        <section>
            <input 
            className="p-2 border rounded-2xl border-gray-400 w-full lg:w-3/4 mb-5" 
            placeholder="Busqueda"
            onChange={onInputChange}>
            </input>
            <div className="flex flex-row items-center justify-between">
                <h2 className="text-2xl font-bold">{keyword ? `Busqueda > ${keyword}` : "Todos"}</h2>
                <button className="border rounded-2xl p-2">Ordenar por</button>
            </div>
            <div className="mb-5 space-y-2">
                <h2 className="text-xl font-bold">Categorias</h2>
                <div className="flex gap-2">
                {
                    categories.map((category) => {
                        return <Link onClick={() => handleCategory(category)} href={`/shop?category=${category}`} className="border border-zinc-200 rounded-2xl px-2 py-2">{category}</Link>
                    })
                }
                </div>
            </div>
            <Grid keyword={keyword} category={category} columns={4}/>
        </section>
    )
}
