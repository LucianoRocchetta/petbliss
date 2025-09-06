"use client";

import { Grid } from "@/components/shared/grid";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { IconCircleDashedPlus } from "@tabler/icons-react";
import { CreateProductModal } from "@/components/admin";

export const AdminProductsGrid = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleKeywordChange = useCallback(
    debounce((value: string) => {
      setKeyword(value);
    }, 1000),
    []
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleKeywordChange(e.target.value);
  };

  const handleIsModalVisible = () => {
    setIsModalVisible(true);
  };

  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold">Productos</h2>
      <div className="grid grid-cols-3 gap-2 items-center justify-between mb-5 lg:flex">
        <input
          className="p-2 lg:p-4 border rounded-2xl text-zinc-800 col-span-2 lg:w-1/4"
          placeholder="Busqueda"
          onChange={onInputChange}
        ></input>
        <button
          onClick={handleIsModalVisible}
          className="p-2 col-span-1 gap-1 bg-blue-600 flex items-center justify-center rounded-2xl text-zinc-200 hover:bg-blue-700 duration-200"
        >
          <IconCircleDashedPlus className="w-8 h-8" />
          Agregar
        </button>
      </div>

      <Grid keyword={keyword} columns={4} />
      {isModalVisible && (
        <CreateProductModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </section>
  );
};
