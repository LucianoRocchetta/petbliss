"use client";

import { Grid } from "@/components/shared/grid";
import { ChangeEvent, useCallback, useEffect, useState, Suspense } from "react";
import { debounce, set } from "lodash";
import { useSearchParams } from "next/navigation";
import { Brand, Category } from "@/types";
import { getCategories } from "@/services/categoryService";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { getBrands } from "@/services/brandService";

function CatalogContent() {
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>(
    searchParams.get("category") || ""
  );
  const [searchInput, setSearchInput] = useState<string>("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brand, setBrand] = useState<string>(searchParams.get("brand") || "");
  const [sortBy, setSortBy] = useState<string>("price");
  const [order, setOrder] = useState<string>("asc");
  const router = useRouter();

  useEffect(() => {
    setKeyword("");
    setSearchInput("");
  }, [category, brand]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res: Category[] = await getCategories();
        const categoriesNames = res.map((category) => category.name);
        setCategories(categoriesNames);
      } catch (error) {
        console.log("Failed to fetch categories");
      }
    };

    const fetchBrandsNames = async () => {
      try {
        const res = await getBrands();
        const brandNames = res.map((brand: { name: string; slug: string }) => ({
          name: brand.name,
          slug: brand.slug,
        }));
        setBrands(brandNames);
      } catch (error) {
        console.error("Failed to fetch brands names");
      }
    };

    fetchBrandsNames();
    fetchCategories();
  }, []);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    if (selectedCategory) {
      setCategory(selectedCategory);
      router.push(`/shop?category=${selectedCategory}`);
    }
  };

  const handleBrandChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = e.target.value;
    setBrand(selectedBrand);
    const query = new URLSearchParams(searchParams.toString());
    if (selectedBrand) {
      query.set("brand", selectedBrand);
    } else {
      query.delete("brand");
    }
    router.push(`/shop?${query.toString()}`);
  };

  const handleOrderBySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, order] = e.target.value.split("-");
    setOrder(order);
    setSortBy(sortBy);
  };

  const handleKeywordChange = useCallback(
    debounce((value: string) => {
      setKeyword(value);
    }, 1000),
    []
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    handleKeywordChange(e.target.value);
  };

  return (
    <section>
      <div className="mb-5 p-5 bg-zinc-700 rounded-2xl">
        <div className="relative w-full lg:w-1/4">
          <IconSearch
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400"
            size={20}
          />
          <input
            className="p-4 pl-12 border rounded-2xl w-full text-zinc-800 focus:outline-none"
            placeholder="Buscar productos..."
            value={searchInput}
            onChange={onInputChange}
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-10">
        <h2 className="text-2xl font-bold">
          {keyword ? `Busqueda > ${keyword}` : "Todos"}
        </h2>
        <div className="mt-2 gap-2 flex flex-col lg:flex-row items-start lg:items-center">
          <div>
            <h3 className="mr-2">Marca</h3>
            <select
              value={brand}
              className="p-4 rounded-2xl text-zinc-800"
              onChange={handleBrandChange}
            >
              <option value="">Todas las marcas</option>
              {brands.map((brand) => (
                <option key={brand.slug} value={brand.slug}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="mr-2">Categoria</h3>
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
          </div>
          <div>
            <h3 className="mr-2">Ordenar</h3>
            <select
              value={`${sortBy}-${order}`}
              className="p-4 rounded-2xl text-zinc-800"
              onChange={handleOrderBySelect}
            >
              <option value="price-asc">Precio - Ascendente</option>
              <option value="price-desc">Precio - Descendente</option>
            </select>
          </div>
        </div>
      </div>
      <Grid
        keyword={keyword}
        category={category}
        columns={4}
        limit={8}
        order={order}
        sortBy={sortBy}
        brand={brand}
      />
    </section>
  );
}

export const Catalog = () => {
  return (
    <Suspense fallback={<div>Cargando catalago</div>}>
      <CatalogContent />
    </Suspense>
  );
};
