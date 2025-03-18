"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { IconHome, IconShoppingCart, IconCat } from "@tabler/icons-react"
import Image from "next/image"

export const TopbarMenu = () => {
    const { data: session, status } = useSession();

    const handleCloseSession = async () => {
        try {
            await signOut();
            console.log("Session closed successfully")
        } catch (error) {
            console.error("Error closing session")
        }
    }

    return (
        <aside className="flex bg-zinc-700/30 shadow-zinc-600">
            <div className="flex-col lg:w-3/4 m-auto flex lg:flex-row justify-between items-center">
            <Link href="/home" className="flex items-center justify-start">
            <Image src={"/images/logo.png"}  alt="whiskers-logo" width={200} height={200} className="w-32 h-32 lg:w-40 lg:h-40"/>
            <h1 className="text-2xl lg:text-3xl">Whiskers</h1>
            </Link>
            <menu className="flex items-center">
                <ul className="flex gap-2">
                    <Link href={"/shop"} className="flex items-center gap-2 bg-zinc-700 p-2 rounded-full hover:bg-zinc-800 duration-300">
                        <IconShoppingCart className="hidden lg:w-10 lg:h-10 p-2 rounded-full bg-zinc-200 text-zinc-800 lg:block "/>
                        <h2 className="lg:text-lg">Tienda</h2>
                    </Link>
                    <Link href={"#"} className="flex items-center gap-2 bg-zinc-700 p-2 rounded-full hover:bg-zinc-800 duration-300">
                        <IconCat className="hidden lg:w-10 lg:h-10 p-2 rounded-full bg-zinc-200 text-zinc-800 lg:block"/>
                        <h2 className="lg:text-lg">Sobre nosotros</h2>
                    </Link>
                </ul>
            </menu>
            {
                        session?.user.role == "admin" ? <div className="flex items-center gap-2">
                            <Link href={"/admin"} className="p-2 bg-green-600 text-zinc-200 rounded-2xl">Panel de control</Link>
                            <button className="p-2 bg-red-600 text-zinc-200 rounded-2xl" onClick={handleCloseSession}>Cerrar sesión</button>
                        </div> : ""
                }
           </div>
        </aside>
    )
}