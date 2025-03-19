import { IconX, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import useCartStore from "@/store/cartStore";
import product from "@/models/product";
import { generateWhatsAppTemplateMessage } from "@/lib/utils";

interface CartPanelProps {
  setIsOpen: (isOpen: Boolean) => void;
  isOpen: Boolean; 
}

export default function CartPanel ({setIsOpen, isOpen}: CartPanelProps ) {
    const { items, addItem, removeItem, updateQuantity, clearCart } = useCartStore();

    const toggleCartPanel = () => setIsOpen(!isOpen);

    const handleIncreaseQuantity = (id: string) => {
      const item = items.find((i) => i.product._id === id)
      if(item && item.product.stock > item.quantity) {
        updateQuantity(id, item.quantity + 1);
      }
    }

    const handleDecreaseQuantity = (id: string) => {
      const item = items.find((i) => i.product._id === id)
      if(item && item.quantity > 0) {
        updateQuantity(id, item.quantity - 1);
      }
    }

    const generateWhatsAppMessage = () => {
        return generateWhatsAppTemplateMessage(items);
    }

    return (
    <div className={`z-50 w-full h-full bg-zinc-800 fixed lg:w-1/4 lg:top-0 lg:right-0 p-6 border-zinc-600 border-l transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Carrito</h2>
        <IconX onClick={toggleCartPanel} className="w-10 h-10 p-2 rounded-full bg-zinc-200 text-zinc-800 lg:block"></IconX>
      </div>

        {items.length === 0 ? (
          <p className="text-zinc-400">El carrito está vacío</p>
        ) : (
          <>
            <ul className="mt-2 overflow-scroll grid grid-cols-1 gap-2">
              {items.map((item, index) => (
                <li key={index} className="flex justify-between items-center p-2 bg-zinc-200 text-zinc-800 rounded-2xl">
                  <div className="flex items-center">
                  <Image alt={item.product.name} src={item.product.imageURL} width={100} height={100}></Image>
                  <div className="flex flex-col">
                  <p className="text-xl">{item.product.name}</p>
                  <p className="text-md font-bold">${item.product.price * item.quantity}</p>
                  <div className="flex gap-2 mt-2">
                  <IconChevronUp onClick={() => item.product._id && handleIncreaseQuantity(item.product._id)} className="w-8 h-8 p-2 rounded-full text-zinc-200 bg-zinc-800 lg:block"></IconChevronUp>
                    <p className="font-bold text-xl">{item.quantity}</p>
                    <IconChevronDown onClick={() => item.product._id && handleDecreaseQuantity(item.product._id)} className="w-8 h-8 p-2 rounded-full text-zinc-200 bg-zinc-800 lg:block"></IconChevronDown>
                  </div>
                  </div>
                  </div>
                  <IconX onClick={() => item.product._id && removeItem(item.product._id)} className="hidden lg:w-10 lg:h-10 p-2 text-zinc-800 lg:block"></IconX>
                </li>
              ))}
            </ul>
            
            <div className="grid grid-cols-2 gap-2 mt-5">
            <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${generateWhatsAppMessage()}`} target="_blank" rel="noopener noreferrer">
              <button className="bg-zinc-700 text-zinc-200 rounded-2xl w-full p-2">
                Finalizar Pedido
              </button>
            </Link>
            <button onClick={clearCart} className="bg-red-600 rounded-2xl text-zinc-200 w-full p-2">Vaciar Carrito</button>
            </div>
          </>
        )}
      </div>
  );
};