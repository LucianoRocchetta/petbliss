import Image from "next/image"

export const HomeHero = () => {
  return (
    <section className="w-full h-[150px] lg:h-[800px] relative">
      <Image
        src="/images/hero-bkg.png"
        alt="pet-bliss-banner-sale"
        draggable={false}
        fill
        className="object-cover"
      />
    </section>
  )
}