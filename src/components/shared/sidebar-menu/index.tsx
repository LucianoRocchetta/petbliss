"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { IconHome, IconShoppingCart, IconCat } from "@tabler/icons-react"
import Image from "next/image"

export const SideBarMenu = () => {
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
        <aside className="flex lg:w-[350px] flex-col bg-zinc-700/30 shadow-zinc-600 ">
            <div className="lg:w-full h-[300px] flex-col items-center justify-center relative">
            <Image src={"/images/logo.png"}  alt="whiskers-logo" fill/>
            <h1 className="text-3xl absolute bottom-10 left-1/2 -translate-x-1/2">Whiskers</h1>
            </div>
            <menu className="flex items-center flex-col">
                <ul className="flex gap-4 p-4 lg:flex-col">
                    <Link href={"/home"} className="flex items-center gap-2">
                        <IconHome className="lg:w-10 h-10"/>
                        <h2 className="lg:text-xl">Inicio</h2>
                    </Link>
                    <Link href={"/shop"} className="flex items-center gap-2">
                        <IconShoppingCart className="lg:w-10 h-10"/>
                        <h2 className="lg:text-xl">Tienda</h2>
                    </Link>
                    <Link href={"#"} className="flex items-center gap-2">
                        <IconCat className="lg:w-10 h-10"/>
                        <h2 className="lg:text-xl">Sobre nosotros</h2>
                    </Link>

                    
                </ul>

                {
                        session?.user.role == "admin" ? <div className="flex items-center gap-2">
                            <Link href={"/admin"} className="p-2 bg-green-600 text-zinc-200 rounded-2xl">Panel de control</Link>
                            <button className="p-2 bg-red-600 text-zinc-200 rounded-2xl" onClick={handleCloseSession}>Cerrar sesión</button>
                        </div> : ""
                }
            </menu>

           
        </aside>
    )
}