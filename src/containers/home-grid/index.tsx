import Image from "next/image"

export default function HomeGrid() {
    return (
        <section>
            <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2 h-[300px] relative">
                    
                    <Image 
                        alt="" 
                        src="https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        fill
                        className="object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black opacity-20 rounded-xl"></div>
                    <div className="absolute bottom-0 left-0 flex flex-col p-5 gap-2">
                        <h2 className="text-4xl font-bold text-white">Lorem ipsum dolor sit amet</h2>
                        <button className="bg-white text-black rounded-xl p-2 w-1/4">Explorar</button>
                    </div>
                </div>
                <div className="h-[300px] relative rounded-xl">
                    <Image 
                        alt="" 
                        src="https://images.unsplash.com/photo-1596854307943-279e29c90c14?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        fill
                        className="object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black opacity-20 rounded-xl"></div>
                    <div className="absolute bottom-0 left-0 flex flex-col p-5 gap-2">
                        <h2 className="text-4xl font-bold text-white">Lorem ipsum dolor sit amet</h2>
                        <button className="bg-white text-black rounded-xl p-2 w-1/4">Explorar</button>
                    </div>
                </div>
                <div className="h-[300px] relative rounded-xl">
                    <Image 
                        alt="" 
                        src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        fill
                        className="object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black opacity-20 rounded-xl"></div>
                    <div className="absolute bottom-0 left-0 flex flex-col p-5 gap-2">
                        <h2 className="text-4xl font-bold text-white">Lorem ipsum dolor sit amet</h2>
                        <button className="bg-white text-black rounded-xl p-2 w-1/4">Explorar</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
