import { IconBrandWhatsapp, IconBrandInstagram } from "@tabler/icons-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-zinc-800 flex items-center justify-between py-10 border-t border-zinc-600 w-3/4 m-auto mt-20">
      <h2 className="text-bold text-zinc-400">
        Copyright © 2025 Petblissarg.com. Todos los derechos reservados.
      </h2>
      <div className="lg:fixed flex bottom-0 right-0 lg:bottom-10 lg:right-20 lg:grid gap-2">
        <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}>
          <IconBrandWhatsapp className="w-12 h-12 text-zinc-200 border border-zinc-200 rounded-full p-2 hover:bg-zinc-200 hover:text-zinc-800 duration-200 cursor-pointer" />
        </Link>
        <Link href="https://www.instagram.com/petblissarg">
          <IconBrandInstagram className="w-12 h-12 text-zinc-200 border border-zinc-200 rounded-full p-2 hover:bg-zinc-200 hover:text-zinc-800 duration-200 cursor-pointer" />
        </Link>
      </div>
    </footer>
  );
};
