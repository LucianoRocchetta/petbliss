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

  message += `*Productos en el carrito:*\n`;

  items.forEach((item) => {
    const variant = item.product.variants[item.variant];
    const unitPrice = variant.discount > 0 ? variant.discountedPrice : variant.price;
    const subtotal = unitPrice * item.quantity;

    message += `*${item.product.name} - ${variant.weight}kg*\n`;
    message += `\tCantidad: ${item.quantity}\n`;
    message += `\tPrecio unitario: $${unitPrice.toFixed(2)}\n`;
    message += `\tDescuento: ${variant.discount}%\n`;
    message += `\tSubtotal: $${subtotal.toFixed(2)}\n\n`;

    total += subtotal;
  });

  message += `*Detalles del comprador:*\n`;
  message += `\tNombre: ${name}\n`;
  message += `\tDirección: ${address}\n`;
  message += `\tMétodo de pago: ${paymentMethod}\n\n`;

  message += `*Total a pagar:* $${total.toFixed(2)}\n\n`;

  return encodeURIComponent(message);
}


