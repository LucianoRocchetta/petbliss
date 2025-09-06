import Image from "next/image";
import Categories from "../categories";
import Brands from "../brands";
import Link from "next/link";
import { IconCreditCard, IconTruckDelivery } from "@tabler/icons-react";

export default function HomeGrid() {
  return (
    <section>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 p-5 bg-zinc-700/30 rounded-2xl mb-20">
        <div className="flex flex-col items-center lg:border-r-2 border-r-zinc-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <IconTruckDelivery className="w-8 h-8 lg:w-16 lg:h-16" />
              <h2 className="text-xl lg:text-2xl font-bold">Entrega</h2>
            </div>
            <p>Tu compra tiene envío sin cargo en CABA miércoles y sábados.</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <IconCreditCard className="w-8 h-8 lg:w-16 lg:h-16" />
              <h2 className="text-xl lg:text-2xl font-bold">Pago</h2>
            </div>
            <p>Realiza el pago una vez que el producto esta en tu puerta.</p>
          </div>
        </div>
      </div>
      <Brands />
      <div className="grid grid-cols-2 mt-10 mb-10">
        <div className="col-span-2 h-[300px] relative mb-4">
          <Image
            alt=""
            src="https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            fill
            className="object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-zinc-900 opacity-20 rounded-xl"></div>
          <div className="absolute bottom-0 left-0 flex flex-col p-5 gap-2">
            <h2 className="text-3xl font-bold lg:text-4xl">
              Conoce nuestros productos
            </h2>
            <Link
              href="/shop"
              className="bg-zinc-200 text-zinc-800 rounded-xl p-2 w-fit"
            >
              Explorar
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-4">
        <Categories />
      </div>
    </section>
  );
}
