import { CartItem } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateWhatsAppTemplateMessage(
  items: CartItem[],
  name: string,
  address: string,
  paymentMethod: string
) {
  let message = `*Pedido de Compra Pet Bliss*\n\n`;
  let total = 0;
  let productTotal = 0;

  message += `*Productos en el carrito:*\n`;
  items.forEach((item) => {
    if (item.product.discount > 0) {
      productTotal = item.product.discountedPrice * item.quantity;
    } else {
      productTotal = item.product.price * item.quantity
    }
    
    message += `*${item.product.name}*\n`;
    message += `\tCantidad: ${item.quantity}\n`;
    message += `\tPrecio unitario: $${item.product.price.toFixed(2)}\n`;
    message += `\tDescuento por producto: ${item.product.discount}%\n`;
    message += `\tSubtotal: $${productTotal.toFixed(2)}\n\n`;
    total += productTotal;
  });

  message += `*Detalles del comprador:*\n`;
  message += `\tNombre: ${name}\n`;
  message += `\tDirección: ${address}\n`;
  message += `\tMétodo de pago: ${paymentMethod}\n\n`;

  message += `*Total a pagar:* $${total.toFixed(2)}\n\n`;

  return encodeURIComponent(message);
}

