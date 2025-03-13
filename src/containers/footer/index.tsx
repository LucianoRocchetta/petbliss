import { IconBrandWhatsapp, IconBrandInstagram} from "@tabler/icons-react"

export const Footer = () => {
    return (
        <footer className="bg-zinc-800 flex items-center justify-between p-5 border-t border-zinc-600">
            <h2 className="text-bold text-zinc-400">@Copyright Whiskers.com. All rights reserved 2025</h2>
            <div className="flex gap-2">
                <IconBrandInstagram className="w-12 h-12 text-zinc-200 border border-zinc-200 rounded-full p-2"/>
                <IconBrandWhatsapp className="w-12 h-12 text-zinc-200 border border-zinc-200 rounded-full p-2" />
            </div>
        </footer>
    )
}