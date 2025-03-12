"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { IconHome, IconShoppingCart, IconCat } from "@tabler/icons-react"

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
        <aside className="w-1/6 border-gray-300 border-r bg-gray-50">
            <div className="w-full flex items-center justify-center p-4">
            <h1 className="text-3xl">Whiskers</h1>
            </div>
            <menu className="flex items-center flex-col">
                <ul className="flex flex-col gap-4 p-4">
                    <Link href={"/home"} className="flex items-center gap-2">
                        <IconHome className="w-10 h-10"/>
                        <h2 className="text-xl">Inicio</h2>
                    </Link>
                    <Link href={"/shop"} className="flex items-center gap-2">
                        <IconShoppingCart className="w-10 h-10"/>
                        <h2 className="text-xl">Tienda</h2>
                    </Link>
                    <Link href={"#"} className="flex items-center gap-2">
                        <IconCat className="w-10 h-10"/>
                        <h2 className="text-xl">Sobre nosotros</h2>
                    </Link>

                    
                </ul>

                {
                        session?.user.role == "admin" ? <div className="flex items-center gap-2">
                            <Link href={"/admin"} className="p-2 bg-green-500 text-white rounded-2xl">Panel de control</Link>
                            <button className="p-2 bg-red-500 text-white rounded-2xl" onClick={handleCloseSession}>Cerrar sesión</button>
                        </div> : ""
                }
            </menu>

           
        </aside>
    )
}