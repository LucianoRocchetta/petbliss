import Link from "next/link"
import { IconHome, IconShoppingCart, IconCat } from "@tabler/icons-react"

export const SideBarMenu = () => {
    return (
        <aside className="w-1/6 border-gray-300 border-r bg-gray-50">
            <div className="w-full flex items-center justify-center p-4">
            <h1 className="text-3xl">Whiskers</h1>
            </div>
            <menu>
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
            </menu>
        </aside>
    )
}