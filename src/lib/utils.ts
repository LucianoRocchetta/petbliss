import { CartItem } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateWhatsAppTemplateMessage(items: CartItem[]) {
  let message = "Hola, estoy interesado en comprar los siguientes productos: \n\n"
  let total = 0;

  items.forEach((item) => {
    const productTotal = item.product.price * item.quantity;
    message += `${item.product.name} - Cantidad: ${item.quantity} - Precio: $${item.product.price} - Total: $${productTotal}\n`;
    total += productTotal;
  });

  message += `\nTotal del carrito: $${total.toFixed(2)}`;

  return encodeURIComponent(message);
}
