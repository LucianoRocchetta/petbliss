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