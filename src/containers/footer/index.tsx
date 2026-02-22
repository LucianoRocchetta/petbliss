import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] m-auto mt-20 w-full">
      <div className="section-container flex flex-col gap-10">
        <div className="flex justify-between py-10">
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-4">
              <Image 
                src="/images/logo-rounded-black.png" 
                alt="Petbliss Logo" 
                width={100} 
                height={100} 
                className="w-16 h-16"
              />
              <h2 className="text-4xl font-bold text-white">Petbliss</h2>
            </Link>

            <p className="text-base font-light text-[#E3E3E3]">Nutrición Premium para tus queridas <br /> mascotas.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div>
              <h3 className="text-2xl font-bold text-white">Acerca de</h3>
              <ul className="flex flex-col gap-2 mt-5">
                <li className="text-base font-light text-[#E3E3E3]">
                  <Link href="/shop">Sobre nosotros</Link>
                </li>
                <li className="text-base font-light text-[#E3E3E3]">
                  <Link href="/shop">Reseñas</Link>
                </li>
                <li className="text-base font-light text-[#E3E3E3]">
                  <Link href="/shop">Ubicación</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">Soporte</h3>
              <ul className="flex flex-col gap-2 mt-5">
                <li className="text-base font-light text-[#E3E3E3]">
                  <Link href="/shop">Contactanos</Link>
                </li>
                <li className="text-base font-light text-[#E3E3E3]">
                  <Link href="/shop">Preguntas frecuentes</Link>
                </li>
                <li className="text-base font-light text-[#E3E3E3]">
                  <Link href="/shop">Envíos y devoluciones</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">Catálogo</h3>
              <ul className="flex flex-col gap-2 mt-5">
                <li className="text-base font-light text-[#E3E3E3]">
                  <Link href="/shop">Alimento para gatos</Link>
                </li>
                <li className="text-base font-light text-[#E3E3E3]">
                  <Link href="/shop">Alimento para perros</Link>
                </li>
                <li className="text-base font-light text-[#E3E3E3]">
                  <Link href="/shop">Snacks</Link>
                </li>
                <li className="text-base font-light text-[#E3E3E3]">
                  <Link href="/shop">Salud y belleza</Link>
                </li>
              </ul>
            </div>


          </div>

        </div>

        <div className="w-full border-t border-[#737373]/50 py-5 flex items-center justify-between text-[#E3E3E3]">
          <p>
            © 2026 Petbliss. Todos los derechos reservados.
          </p>
          <p className="text-bold flex items-center gap-2">
            Hecho con <Heart className="w-5 h-5 text-white" /> para mascotas en todas partes
          </p>
        </div>
      </div>
    </footer>
  );
};
