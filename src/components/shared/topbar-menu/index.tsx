"use client";

import useCartStore from "@/store/cartStore";
import { SearchIcon, ShoppingCartIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CartPanel from "../cart";

export default function SearchBar() {
  const pathname = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  if (pathname !== "/") return null;

  const searchProducts = () => {
    const value = inputRef.current?.value.trim();
    if (value) {
      router.push("/shop?keyword=" + encodeURIComponent(value));
    }
  };

  return (
    <div className="w-3/4 my-4 flex items-center justify-center lg:w-1/3 relative">
      <input
        ref={inputRef}
        className="pl-3 pr-10 p-4 rounded-2xl w-full border-none text-zinc-800 focus:ring-0 focus:ring-offset-0 focus:outline-none bg-zinc-200"
        placeholder="Buscar producto"
        onKeyDown={(e) => {
          e.key === "Enter" && searchProducts();
        }}
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-700"
        aria-label="Buscar"
        onClick={searchProducts}
      >
        <SearchIcon />
      </button>
    </div>
  );
}

export const TopbarMenu = () => {
  const { data: session } = useSession();
  const { isOpen, toggleCart } = useCartStore();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCloseSession = async () => {
    try {
      await signOut();
      console.log("Session closed successfully");
    } catch (error) {
      console.error("Error closing session");
    }
  };

  return (
    <>
      <CartPanel isOpen={isOpen} setIsOpen={toggleCart} />

      <div className="flex flex-col items-center justify-center fixed w-full max-w-[1440px] top-0 left-1/2 transform -translate-x-1/2 z-40">
        <div className={`w-full flex lg:flex-row justify-between items-center bg-white/60 shadow-zinc-600 rounded-b-[20px] z-40 backdrop-blur-[16px] px-4`}>
          <Link href="/" className="p-2 flex items-center justify-start">
            <Image
              src={"/images/logo-rounded-black.png"}
              alt="pet-bliss-logo"
              width={200}
              height={200}
              className="lg:w-16 lg:h-16 w-12 h-12"
            />
          </Link>

          {/* {!isMobile && <SearchBar />} */}

          <menu className="flex items-center gap-5 text-black">
            <Link
              href={"/shop"}
              className="flex items-center"
            >
              <h2 className="hidden lg:text-lg lg:block">Catálogo</h2>
            </Link>
            <Link
              href={"/shop"}
              className="flex items-center"
            >
              <h2 className="hidden lg:text-lg lg:block">Contacto</h2>
            </Link>
            <Link
              href={"/shop"}
              className="flex items-center"
            >
              <h2 className="hidden lg:text-lg lg:block">Sobre nosotros</h2>
            </Link>
          </menu>

          <ul className="flex gap-5 text-black">
            <li>
              <button
                onClick={toggleCart}
                className="flex items-center"
              >
                <SearchIcon className="w-6 h-6" />
              </button>
            </li>
            <li>
              <button
                onClick={toggleCart}
                className="flex items-center"
              >
                <ShoppingCartIcon className="w-6 h-6" />
              </button>
            </li>
          </ul>
        </div>

        <div className="w-full flex justify-center items-end bg-black shadow-zinc-600 rounded-b-[20px] -mt-3.5 z-30 h-[50px] pb-2.5">
          <p className="text-[#E6E6E6] text-sm">
            Envíos gratis los lunes y miércoles
          </p>
        </div>

        {/* {session?.user.role == "admin" ? (
          <div className="w-3/4 my-4 flex flex-row items-center justify-end gap-2">
            <Link
              href={"/admin"}
              className="p-2 bg-zinc-200 text-zinc-800 rounded-2xl"
            >
              Panel de control
            </Link>
            <button
              className="p-2 bg-red-600 text-zinc-200 rounded-2xl"
              onClick={handleCloseSession}
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          ""
        )} */}

        {isMobile && <SearchBar />}
      </div>
    </>
  );
};
