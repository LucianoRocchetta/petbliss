import { Grid } from "@/components/shared/grid";
import Link from "next/link";

type CarouselProps = {
    title: string;
    category: string;
}   

export const Carousel = ({ title, category }: CarouselProps) => {
    return (
        <section>
            <div className="flex flex-col space-y-2 w-fit lg:flex-row lg:items-center justify-between mb-5 lg:w-full">
            <h2 className="text-2xl font-bold">{title}</h2>
            <Link href={`/shop?category=${category}`} className="border rounded-2xl p-2 hover:text-zinc-800 hover:bg-zinc-200 duration-200">
                Ver más {title}
            </Link>
            </div>
            <Grid columns={4} category={category}/>
        </section>
    )
}
