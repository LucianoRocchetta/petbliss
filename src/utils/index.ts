import { disconnect } from "process";

export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/--+/g, "-")
    .trim();
};

export const formatPrice = (price:number): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "ARG",
  }).format(price);
}

export const calculateFinalPrice = (
  cost: number,
  profit: number,
  discount: number
): number => {
  cost = Number(cost)
  profit = Number(profit)
  discount = Number(discount)
  const priceWithProfit = cost + cost * (profit / 100);
  const finalPrice = discount > 0
    ? priceWithProfit - priceWithProfit * (discount / 100)
    : priceWithProfit;

  return finalPrice;
};