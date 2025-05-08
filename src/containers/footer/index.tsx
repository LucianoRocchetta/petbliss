import { IconBrandWhatsapp, IconBrandInstagram } from "@tabler/icons-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-zinc-800 flex items-center justify-between py-10 border-t border-zinc-600 w-3/4 m-auto">
      <h2 className="text-bold text-zinc-400">
        @Copyright PetBliss.com. All rights reserved 2025
      </h2>
      <div className="flex gap-2">
        <Link href="https://www.instagram.com/petblissarg">
          <IconBrandInstagram className="w-12 h-12 text-zinc-200 border border-zinc-200 rounded-full p-2 hover:bg-zinc-200 hover:text-zinc-800 duration-200 cursor-pointer" />
        </Link>
        <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}>
          <IconBrandWhatsapp className="w-12 h-12 text-zinc-200 border border-zinc-200 rounded-full p-2 hover:bg-zinc-200 hover:text-zinc-800 duration-200 cursor-pointer" />
        </Link>
      </div>
    </footer>
  );
};
