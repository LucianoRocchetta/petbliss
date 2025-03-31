"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { IconCategory, IconShoppingCart } from "@tabler/icons-react";
import CartPanel from "../cart";
import Image from "next/image";
import useCartStore from "@/store/cartStore";

export const TopbarMenu = () => {
  const { data: session, status } = useSession();
  const { isOpen, toggleCart } = useCartStore();

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
      <div className="flex flex-col bg-zinc-700/30 shadow-zinc-600 items-center justify-center">
        <div
          className={`w-3/4 m-auto flex lg:flex-row justify-between items-center ${
            session?.user.role == "admin" ? "border-b border-zinc-600" : ""
          }`}
        >
          <Link href="/" className="p-2 flex items-center justify-start">
            <Image
              src={"/images/logo.png"}
              alt="pet-bliss-logo"
              width={200}
              height={200}
              className="w-16 h-16"
            />
            <h1 className="text-2xl lg:text-3xl ml-2">Pet Bliss</h1>
          </Link>
          <menu className="flex items-center">
            <ul className="flex gap-2">
              <Link
                href={"/shop"}
                className="flex items-center gap-2 bg-zinc-700 p-2 rounded-full hover:bg-zinc-800 duration-300"
              >
                <IconCategory className="w-10 h-10 p-2 rounded-full bg-zinc-200 text-zinc-800 lg:block " />
                <h2 className="hidden lg:text-lg lg:block">Catálogo</h2>
              </Link>
              <button
                onClick={toggleCart}
                className="flex items-center gap-2 bg-zinc-700 p-2 rounded-full hover:bg-zinc-800 duration-300"
              >
                <IconShoppingCart className="w-10 h-10 p-2 rounded-full bg-zinc-200 text-zinc-800" />
              </button>
            </ul>
          </menu>
        </div>
        {session?.user.role == "admin" ? (
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
        )}
      </div>
    </>
  );
};
