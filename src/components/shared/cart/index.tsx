import { IconX, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import Image from "next/image";
import useCartStore from "@/store/cartStore";
import { generateWhatsAppTemplateMessage } from "@/lib/utils";
import { CartItem } from "@/types";
import { useState } from "react";
import { formatPrice } from "@/utils";
import { toast } from "sonner";

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

  const handleCheckout = () => {
    if (!name || !address || !paymentMethod) {
      toast.warning("Por favor completá con tus datos");
      return;
    }

    const url = `https://wa.me/${
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
    }?text=${generateWhatsAppTemplateMessage(
      items,
      name,
      address,
      paymentMethod
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

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
        <button
          onClick={handleCheckout}
          className="bg-zinc-200 text-zinc-800 rounded-2xl w-full p-2"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
};

export default function CartPanel({ setIsOpen, isOpen }: CartPanelProps) {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

  const toggleCartPanel = () => setIsOpen(!isOpen);

  const handleIncreaseQuantity = (id: string, variant: number) => {
    const item = items.find(
      (i) => i.product._id === id && i.variant === variant
    );
    if (item) {
      updateQuantity(id, variant, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (id: string, variant: number) => {
    const item = items.find(
      (i) => i.product._id === id && i.variant === variant
    );
    if (item && item.quantity > 1) {
      updateQuantity(id, variant, item.quantity - 1);
    }
  };

  const handleCheckoutVisible = () => {
    +setIsCheckoutVisible(!isCheckoutVisible);
  };

  return (
    <div
      className={`z-50 w-full h-full overflow-y-auto bg-zinc-800 fixed lg:w-1/4 lg:top-0 lg:right-0 p-6 border-zinc-600 border-l transform ${
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
              <ul className="mt-2 grid grid-cols-1 gap-2">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="flex-col items-center p-5 bg-zinc-200 text-zinc-800 rounded-2xl"
                  >
                    <div className="flex items-center justify-end">
                      <IconX
                        onClick={() =>
                          item.product._id &&
                          removeItem(item.product._id, item.variant)
                        }
                        className="w-10 h-10 p-2 border rounded-full border-zinc-500 text-zinc-800 lg:block cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center">
                      <div className="w-48 h-48 overflow-hidden relative">
                        <Image
                          src={item.product.imageURL}
                          alt={item.product.name}
                          width={250}
                          height={250}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="ml-5">
                        <div className="flex-col gap-2 items-center">
                          <p className="text-2xl">{item.product.name}</p>
                          <p>{item.product.variants[item.variant].weight}kg</p>
                        </div>
                        {item.product.variants[item.variant].discount > 0 ? (
                          <p className="text-sm font-bold line-through">
                            $
                            {formatPrice(
                              item.product.variants[item.variant].price *
                                item.quantity
                            )}
                          </p>
                        ) : null}
                        <p className="text-md font-bold">
                          $
                          {formatPrice(
                            item.product.variants[item.variant].discount > 0
                              ? item.product.variants[item.variant]
                                  .discountedPrice * item.quantity
                              : item.product.variants[item.variant].price *
                                  item.quantity
                          )}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <IconChevronUp
                            onClick={() =>
                              item.product._id &&
                              handleIncreaseQuantity(
                                item.product._id,
                                item.variant
                              )
                            }
                            className="w-8 h-8 p-2 rounded-full text-zinc-200 bg-zinc-800 lg:block cursor-pointer"
                          />
                          <p className="font-bold text-xl">{item.quantity}</p>
                          <IconChevronDown
                            onClick={() =>
                              item.product._id &&
                              handleDecreaseQuantity(
                                item.product._id,
                                item.variant
                              )
                            }
                            className="w-8 h-8 p-2 rounded-full text-zinc-200 bg-zinc-800 lg:block cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
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
