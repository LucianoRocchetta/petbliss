import Image from "next/image"
import { Truck, CreditCard, Gift, ShieldCheck } from "lucide-react"

export const PerfectExperience = () => {
  return (
    <section className="w-full section-y-padding">
      <div className="section-container flex flex-col gap-10">
        <div>
          <h2 className="section-title">La experiencia perfecta</h2>
          <p className="section-paragraph">Diseñamos cada paso para que el cuidado de su mascota sea sencillo.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:min-h-[350px] gap-x-10 gap-y-5 lg:gap-y-0">
            <div className="grid grid-rows-2 col-span-1 gap-5">
                <div className="flex flex-col gap-2 items-center justify-center">
                    <div className="bg-[#737373]/10 rounded-[5px] p-2">
                        <Truck strokeWidth={1} className="w-[48px] h-[48px] text-[#1a1a1a]" />
                    </div>
                    <h3 className="text-2xl font-bold text-center">Envíos gratis en CABA</h3>
                    <p className="text-base font-light text-[#737373] text-center">Obtené tus envíos en CABA completamente gratis los lunes y miércoles. Planifique con anticipación y ahorre.</p>
                </div>

                <div className="flex flex-col gap-2 items-center justify-center">
                    <div className="bg-[#737373]/10 rounded-[5px] p-2">
                        <CreditCard strokeWidth={1} className="w-[48px] h-[48px] text-[#1a1a1a]" />
                    </div>
                    <h3 className="text-2xl font-bold text-center">Pagá contra-entrega</h3>
                    <p className="text-base font-light text-[#737373] text-center">Sin pagos por delante necesarios. Pagá de forma segura cuando tu orden llegue a tu puerta.</p>
                </div>
            </div>


            <div className="hidden lg:block col-span-2 row-span-2">
                <Image 
                    src="/images/cat-perfect-experience.png"
                    width={500}
                    height={500}
                    alt="Perfect Experience"
                    className="object-cover rounded-[10px] w-full h-full"
                />
            </div>

            <div className="grid grid-rows-2 col-span-1 gap-5">
                <div className="flex flex-col gap-2 items-center justify-center">
                    <div className="bg-[#737373]/10 rounded-[5px] p-2">
                        <Gift strokeWidth={1} className="w-[48px] h-[48px] text-[#1a1a1a]" />
                    </div>
                    <h3 className="text-2xl font-bold text-center">Muestras de regalo</h3>
                    <p className="text-base font-light text-[#737373] text-center">Probá antes de tu compra. Obtené muestras  complementarias con la compra de tu producto.</p>
                </div>

                <div className="flex flex-col gap-2 items-center justify-center">
                    <div className="bg-[#737373]/10 rounded-[5px] p-2">
                        <ShieldCheck strokeWidth={1} className="w-[48px] h-[48px] text-[#1a1a1a]" />
                    </div>
                    <h3 className="text-2xl font-bold text-center">Garantía de calidad</h3>
                    <p className="text-base font-light text-[#737373] text-center">100% de satisfacción garantizada. ¿No estás satisfecho? Lo solucionaremos, sin hacer preguntas.</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}