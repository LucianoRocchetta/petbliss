This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# PetBliss - E-commerce de Productos para Mascotas

Sistema de e-commerce especializado en productos para mascotas con un robusto sistema de gestión de productos, variantes y proveedores.

## 🆕 Nuevo Sistema de Productos

El sistema de productos ha sido completamente rediseñado para soportar diferentes tipos de productos con variantes específicas:

- **Alimentos** (food): Con variantes de peso, sabor, edad y dieta especial
- **Accesorios** (accessory): Con variantes de talle, color y material
- **Snacks** (snack): Con variantes de peso, sabor y textura
- **Medicinas** (medicine): Con variantes de dosis, presentación y cantidad
- **Higiene** (hygiene): Con variantes de volumen, aroma y subtipo
- **Juguetes** (toy): Con variantes de tamaño, material e interactividad
- **Otros** (other): Con variantes genéricas personalizables

### 🚀 Inicio Rápido con el Nuevo Sistema

```typescript
import connectDB from "@/lib/mongoose";
import Product from "@/models/product";

// Conectar a la base de datos 'production'
await connectDB(true);

// Crear un producto de alimento
const product = await Product.create({
  productType: "food",
  brand: brandId,
  name: "Alimento Premium",
  category: categoryId,
  targetAnimal: "dog",
  // ... más campos
});
```

Para ejemplos completos, consulta `PRODUCT_EXAMPLES.ts`.

## ⚙️ Configuración

### Variables de Entorno

Antes de ejecutar el proyecto, configura tus variables de entorno:

1. Crea un archivo `.env.local` en la raíz del proyecto
2. Consulta **[ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md)** para la configuración completa

**Variables principales:**
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net
MONGODB_DB_NAME=production  # Cambia a "test" para desarrollo
NODE_ENV=development
NEXTAUTH_SECRET=tu-secret-aqui
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
