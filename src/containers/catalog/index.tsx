"use client"

import { Grid } from "@/components/shared/grid";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { useSearchParams } from "next/navigation";

export const Catalog = () => {
    const searchParams = useSearchParams();
    const [keyword, setKeyword] = useState<string>('');
    const [category, setCategory] = useState<string>(searchParams.get("category") || "");

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
            className="p-2 border rounded-2xl border-gray-400 w-3/4 mb-5" 
            placeholder="Busqueda"
            onChange={onInputChange}>
            </input>
            <div className="flex flex-row items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">{keyword ? `Busqueda > ${keyword}` : "Todos"}</h2>
            <button className="border rounded-2xl p-2">Ordenar por</button>
            </div>
            <Grid keyword={keyword} category={category} columns={4}/>
        </section>
    )
}
