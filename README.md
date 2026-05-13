# PetBliss — E-commerce de Productos para Mascotas

Plataforma de e-commerce especializada en productos para mascotas con catálogo público, panel de administración protegido, y un robusto sistema de gestión de productos con variantes tipadas.

---

## Stack Tecnológico

| Categoría         | Tecnología                                        |
| ----------------- | ------------------------------------------------- |
| Framework         | Next.js 14 (App Router, React Server Components)  |
| Lenguaje          | TypeScript 5 (strict mode)                        |
| Base de Datos     | MongoDB con Mongoose ODM                          |
| Autenticación     | NextAuth v4 (Credentials + JWT)                   |
| Imágenes          | Cloudinary v2 (upload + CDN)                      |
| Estado            | Zustand v5 (carrito)                              |
| Estilos           | Tailwind CSS 3.4 + shadcn/ui (new-york style)     |
| Animaciones       | Framer Motion 12                                  |
| Carrusel          | Swiper 11                                         |
| Iconos            | Lucide React, Tabler Icons React                  |
| Notificaciones    | sonner (toast)                                    |
| Empaquetador      | npm                                               |

---

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno (ver sección Configuración)
cp .env.example .env.local  # o crear manualmente

# Iniciar servidor de desarrollo
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en el navegador.

---

## ⚙️ Configuración

Crear `.env.local` en la raíz con las siguientes variables:

```env
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/
MONGODB_DB_NAME=production          # Usar "test" para desarrollo
NODE_ENV=development
NEXTAUTH_SECRET=<string-secreto>
CLOUDINARY_CLOUD_NAME=<nombre>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>
```

**Variables requeridas:** `MONGODB_URI`, `NEXTAUTH_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

**Defaults:** `MONGODB_DB_NAME` → `"production"`, `NODE_ENV` → `"development"`.

---

## 🏗️ Estructura del Proyecto

```
petbliss/
├── public/images/                # Imágenes estáticas
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── admin/                # Panel admin (protegido)
│   │   │   ├── login/page.tsx    # Login de administrador
│   │   │   └── page.tsx          # Dashboard
│   │   ├── api/                  # API routes (REST)
│   │   │   ├── auth/[...nextauth]/  # NextAuth handler
│   │   │   ├── products/         # CRUD productos + [id]
│   │   │   ├── brands/           # CRUD marcas + metadata + [id]
│   │   │   ├── categories/       # CRUD categorías + metadata + [id]
│   │   │   └── suppliers/        # CRUD proveedores + metadata + [id]
│   │   ├── shop/page.tsx         # Catálogo público
│   │   └── page.tsx              # Homepage
│   ├── components/               # Componentes UI
│   │   ├── admin/                # Modales y paneles de administración
│   │   ├── shared/               # Componentes compartidos (Topbar, Cart, etc.)
│   │   └── ui/                   # Primitivas shadcn/ui
│   ├── containers/               # Contenedores de páginas/features
│   ├── lib/                      # Utilidades core (mongoose, auth, cloudinary)
│   ├── middleware.ts             # Protección de rutas admin
│   ├── models/                   # Modelos Mongoose
│   ├── services/                 # Wrappers de fetch del lado cliente
│   ├── store/                    # Zustand (carrito)
│   ├── types/                    # Definiciones TypeScript
│   └── utils/                    # Helpers, constantes, formateadores
├── .env.local                    # Variables de entorno
├── next.config.mjs               # Configuración de Next.js
├── tailwind.config.ts            # Configuración de Tailwind
└── tsconfig.json                 # Configuración de TypeScript
```

---

## 🗄️ Modelos de Base de Datos

### Product (`src/models/product.ts`)

Modelo principal con **patrón discriminador** (`productType`). Soporta 7 tipos de productos, cada uno con variantes específicas.

| Campo         | Tipo                     | Requerido | Default     |
| ------------- | ------------------------ | --------- | ----------- |
| `productType` | String (enum 7 valores)  | Sí        | `"other"`   |
| `brand`       | ObjectId → Brand         | Sí        | —           |
| `name`        | String                   | Sí        | —           |
| `imageURL`    | String (Cloudinary)      | Sí        | —           |
| `available`   | Boolean                  | Sí        | `true`      |
| `category`    | ObjectId → Category      | Sí        | —           |
| `byOrder`     | Boolean                  | Sí        | `false`     |
| `isFeatured`  | Boolean                  | Sí        | `false`     |
| `description` | String                   | Sí        | —           |
| `targetAnimal`| String (enum 8 valores)  | No        | `"all"`     |
| `variants`    | `[Schema.Types.Mixed]`   | Sí        | `[]`        |

**Tipos de producto:** `food`, `accessory`, `snack`, `medicine`, `hygiene`, `toy`, `other`.

**Sistema de variantes:** Cada tipo tiene campos específicos además de la `BaseVariant` compartida (`price`, `discountedPrice`, `profit`, `discount`, `onSale`, `stock`, `suppliers`). Las variantes usan `Schema.Types.Mixed` — los schemas definidos en el archivo son solo para referencia de validación.

### Brand (`src/models/brand.ts`)

| Campo     | Tipo   | Notas                          |
| --------- | ------ | ------------------------------ |
| `name`    | String | Requerido                      |
| `slug`    | String | Auto-generado por pre-save hook |
| `imageURL`| String | Cloudinary URL                 |

### Category (`src/models/category.ts`)

| Campo     | Tipo   |
| --------- | ------ |
| `name`    | String |
| `imageURL`| String |

### Supplier (`src/models/supplier.ts`)

| Campo          | Tipo    | Default |
| -------------- | ------- | ------- |
| `name`         | String  | unique  |
| `contactEmail` | String  | —       |
| `contactPhone` | String  | —       |
| `address`      | String  | —       |
| `isActive`     | Boolean | `true`  |
| `website`      | String  | —       |
| `taxId`        | String  | —       |
| `paymentTerms` | String  | —       |
| `minimumOrder` | Number  | —       |
| `deliveryTime` | String  | —       |

---

## 🔐 Autenticación y Autorización

- **NextAuth v4** con estrategia JWT y provider de Credentials.
- **Usuario admin hardcodeado** (`petblissadmin`).
- **Middleware** (`src/middleware.ts`): protege la ruta `/admin`, redirige a `/admin/login` si no hay sesión o el rol no es `"admin"`.
- **API routes protegidas** mediante `isAdmin(request)` de `@/lib/authUtils`, que verifica `session.user.role === "admin"`.
- Login en `/admin/login`. Al autenticarse correctamente, redirige al dashboard `/admin`.

---

## 🛒 Carrito de Compras (Zustand)

Estado global en `src/store/cartStore.ts`:

```ts
{
  items: CartItem[],          // { product, quantity, variant }
  isOpen: boolean,
  name: string,               // Nombre del comprador
  address: string,            // Dirección de entrega
  paymentMethod: string,      // Default: "Efectivo"
  // Acciones: addItem, removeItem, updateQuantity, clearCart,
  //           openCart, toggleCart, setName, setAddress, setPaymentMethod
}
```

Los items se deduplican por `product._id + variant`. `addItem` incrementa la cantidad si el mismo producto+variante ya existe.

---

## 📦 API REST

Todas las rutas bajo `/api/`. Las operaciones de escritura (`POST`, `PUT`, `DELETE`) requieren autenticación de administrador.

| Endpoint                      | GET (público)    | POST (admin)     | PUT (admin)      | DELETE (admin)   |
| ----------------------------- | ---------------- | ---------------- | ---------------- | ---------------- |
| `/api/products`               | Listar + filtros | Crear producto   | —                | —                |
| `/api/products/[id]`          | —                | —                | Actualizar       | Eliminar         |
| `/api/brands`                 | Listar           | Crear marca      | —                | —                |
| `/api/brands/metadata`        | Nombres (lean)   | —                | —                | —                |
| `/api/brands/[id]`            | —                | —                | —                | Eliminar         |
| `/api/categories`             | Listar           | Crear categoría  | —                | —                |
| `/api/categories/metadata`    | Nombres (lean)   | —                | —                | —                |
| `/api/categories/[id]`        | —                | —                | —                | Eliminar         |
| `/api/suppliers`              | Listar           | Crear proveedor  | —                | —                |
| `/api/suppliers/metadata`     | Nombres (lean)   | —                | —                | —                |
| `/api/suppliers/[id]`         | —                | —                | —                | Eliminar         |
| `/api/auth/[...nextauth]`     | NextAuth handler | —                | —                | —                |

**Filtros de productos (GET):** `keyword` (búsqueda regex por nombre), `category` (por nombre de categoría), `brand` (por slug de marca), `isFeatured` (boolean). Paginación: `page`, `limit`. Respuesta: `{ products, total, page, totalPages }`.

---

## 🔧 Scripts Disponibles

```bash
npm run dev       # Servidor de desarrollo (localhost:3000)
npm run build     # Build de producción
npm run start     # Iniciar servidor en producción
npm run lint      # Ejecutar ESLint
```

---

## 📝 Convenciones de Código

- **Path alias:** `@/*` → `./src/*`
- **Componentes:** PascalCase. **Utilidades:** camelCase. **Directorios:** kebab-case.
- **Prettier:** sin punto y coma, comillas simples, tabWidth 2, trailingComma es5, printWidth 80.
- **Estilos:** Tailwind CSS con variables CSS de shadcn/ui. Clases utilitarias reutilizables en `globals.css`.
- **Formato de moneda:** `Intl.NumberFormat("es-CO", { currency: "ARG" })` — locale colombiano con pesos argentinos.
- **Cálculo de precios:** `precioBase = costo + costo * (ganancia / 100)`, `precioFinal = precioBase - precioBase * (descuento / 100)`.

---

## 📚 Documentación para Desarrollo

Consultá **[AGENTS.md](./AGENTS.md)** para la guía completa de desarrollo, incluyendo:
- Documentación detallada de cada modelo Mongoose
- Patrones de API route (auth, upload de imágenes, manejo de errores)
- Guía de extensión del proyecto (nuevos tipos de producto, nuevos recursos API)
- Referencia de utilidades clave
- Reglas y limitaciones (no-go & pitfalls)
