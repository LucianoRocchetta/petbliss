"use client"

import { Grid } from "@/components/shared/grid";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { useSearchParams } from "next/navigation";
import { Category } from "@/types";
import { getCategories } from "@/services/categoryService";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export const Catalog = () => {
    const searchParams = useSearchParams();
    const [keyword, setKeyword] = useState<string>('');
    const [categories, setCategories] = useState<string[]>([]);
    const [category, setCategory] = useState<string>(searchParams.get("category") || "");
    const [sortBy, setSortBy] = useState<string>('price');
    const [order, setOrder] = useState<string>('asc');
    const router = useRouter();

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

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.target.value;
        if (selectedCategory) {
            setCategory(selectedCategory);
            router.push(`/shop?category=${selectedCategory}`);
        }
    };

    const handleOrderBySelect = (e: ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        const [sortBy, order] = e.target.value.split("-");
        setOrder(order);
        setSortBy(sortBy);
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
            <div className="mb-5 p-5 bg-zinc-700 rounded-2xl">
            <div className="relative w-full lg:w-1/4">
                    <IconSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
                    <input
                        className="p-4 pl-12 border rounded-2xl w-full text-zinc-800 focus:outline-none"
                        placeholder="Buscar productos..."
                        onChange={onInputChange}
                    />
                </div>
            </div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-10">
                <h2 className="text-2xl font-bold">{keyword ? `Busqueda > ${keyword}` : "Todos"}</h2>
                <div className="mt-2 gap-2 flex">
                <select
                value={category}
                className="p-4 rounded-2xl text-zinc-800"
                onChange={handleCategoryChange}
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <select
                value={`${sortBy}-${order}`}
                className="p-4 rounded-2xl text-zinc-800"
                onChange={(e) => handleOrderBySelect(e)}
                >
                <option value="price-asc">Precio - Ascendente</option>
                <option value="price-desc">Precio - Descendente</option>
                </select>
                </div>
            </div>
            <Grid keyword={keyword} category={category} columns={4} limit={8} order={order} sortBy={sortBy}/>
        </section>
    )
}
