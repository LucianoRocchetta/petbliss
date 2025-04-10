import { IconX, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import useCartStore from "@/store/cartStore";
import { generateWhatsAppTemplateMessage } from "@/lib/utils";
import { CartItem } from "@/types";
import { useState } from "react";

interface CartPanelProps {
  setIsOpen: (isOpen: Boolean) => void;
  isOpen: Boolean;
}

interface CheckoutProps {
  items: CartItem[];
  setIsCheckoutVisible: (isCheckoutVisible: boolean) => void;
}

const Checkout = ({ items, setIsCheckoutVisible }: CheckoutProps) => {
  const {
    setName,
    setAddress,
    setPaymentMethod,
    name,
    address,
    paymentMethod,
  } = useCartStore();

  return (
    <div>
      <h3 className="text-xl font-bold text-zinc-200 mb-2">Detalles</h3>

      <label className="block">Nombre completo</label>
      <input
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 rounded-2xl bg-zinc-200 text-zinc-800 mb-2"
      />

      <label className="block text-zinc-200">Dirección completa</label>
      <input
        type="text"
        name="address"
        onChange={(e) => setAddress(e.target.value)}
        required
        className="w-full p-2 rounded-2xl bg-zinc-200 text-zinc-800 mb-2"
      />

      <label className="block text-white">Método de Pago</label>
      <select
        name="paymentMethod"
        className="w-full p-2 rounded-2xl bg-zinc-200 text-zinc-800 mb-4"
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="Efectivo">Efectivo</option>
        <option value="Transferencia">Transferencia</option>
      </select>
      <div className="grid grid-cols-2 gap-2 mt-5">
        <button
          onClick={() => setIsCheckoutVisible(false)}
          className="bg-zinc-700 text-zinc-200 rounded-2xl w-full p-2"
        >
          Volver a Carrito
        </button>
        <Link
          href={`https://wa.me/${
            process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
          }?text=${generateWhatsAppTemplateMessage(
            items,
            name,
            address,
            paymentMethod
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-zinc-200 text-zinc-800 rounded-2xl w-full p-2">
            Finalizar Pedido
          </button>
        </Link>
      </div>
    </div>
  );
};

export default function CartPanel({ setIsOpen, isOpen }: CartPanelProps) {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

  const toggleCartPanel = () => setIsOpen(!isOpen);

  const handleIncreaseQuantity = (id: string) => {
    const item = items.find((i) => i.product._id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (id: string) => {
    const item = items.find((i) => i.product._id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const handleCheckoutVisible = () => {
    +setIsCheckoutVisible(!isCheckoutVisible);
  };

  return (
    <div
      className={`z-50 w-full h-full bg-zinc-800 fixed lg:w-1/4 lg:top-0 lg:right-0 p-6 border-zinc-600 border-l transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Carrito</h2>
        <IconX
          onClick={toggleCartPanel}
          className="w-10 h-10 p-2 rounded-full bg-zinc-200 text-zinc-800 lg:block hover:bg-zinc-300 cursor-pointer duration-200"
        />
      </div>
      {isCheckoutVisible ? (
        <Checkout items={items} setIsCheckoutVisible={setIsCheckoutVisible} />
      ) : (
        <>
          {items.length === 0 ? (
            <p className="text-zinc-400">El carrito está vacío</p>
          ) : (
            <>
              <ul className="mt-2 overflow-y-auto grid grid-cols-1 gap-2">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-2 bg-zinc-200 text-zinc-800 rounded-2xl"
                  >
                    <div className="flex items-center">
                      <Image
                        alt={item.product.name}
                        src={item.product.imageURL}
                        width={100}
                        height={100}
                      />
                      <div className="flex flex-col">
                        <p className="text-xl">{item.product.name}</p>
                        <p className="text-md font-bold">
                          $
                          {item.product.variants[item.variant].discount > 0
                            ? item.product.variants[item.variant]
                                .discountedPrice * item.quantity
                            : item.product.variants[item.variant].price *
                              item.quantity}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <IconChevronDown
                            onClick={() =>
                              item.product._id &&
                              handleDecreaseQuantity(item.product._id)
                            }
                            className="w-8 h-8 p-2 rounded-full text-zinc-200 bg-zinc-800 lg:block cursor-pointer"
                          />
                          <p className="font-bold text-xl">{item.quantity}</p>
                          <IconChevronUp
                            onClick={() =>
                              item.product._id &&
                              handleIncreaseQuantity(item.product._id)
                            }
                            className="w-8 h-8 p-2 rounded-full text-zinc-200 bg-zinc-800 lg:block cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                    <IconX
                      onClick={() =>
                        item.product._id &&
                        removeItem(item.product._id, item.variant)
                      }
                      className="hidden lg:w-10 lg:h-10 p-2 text-zinc-800 lg:block cursor-pointer"
                    />
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 gap-2 mt-5">
                <button
                  onClick={clearCart}
                  className="bg-red-600 rounded-2xl text-zinc-200 w-full p-2 hover:bg-red-700 duration-200"
                >
                  Vaciar Carrito
                </button>
                <button
                  onClick={handleCheckoutVisible}
                  className="bg-zinc-200 text-zinc-800 rounded-2xl hover:bg-zinc-300 duration-200"
                >
                  Continuar
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
