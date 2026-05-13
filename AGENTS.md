# AGENTS.md — PetBliss Development Guide

> This file provides AI agents and developers with all necessary context, conventions, and rules to contribute to this codebase effectively.

---

## Project Identity

**PetBliss** is an e-commerce platform specialized in pet products, built with Next.js 14 (App Router), MongoDB/Mongoose, NextAuth v4, Cloudinary, Zustand, and shadcn/ui. It features a public-facing storefront (`/shop`, `/`) and a protected admin dashboard (`/admin`).

---

## Tech Stack

| Category          | Technology                                       |
| ----------------- | ------------------------------------------------ |
| Framework         | Next.js 14 (App Router, RSC)                     |
| Language          | TypeScript 5 (strict mode)                       |
| Database          | MongoDB with Mongoose ODM                        |
| Auth              | NextAuth v4 (Credentials, JWT)                   |
| Images            | Cloudinary v2 (upload + CDN)                     |
| State             | Zustand v5 (cart only)                           |
| Styling           | Tailwind CSS 3.4 + shadcn/ui (new-york style)    |
| Animation         | Framer Motion 12                                 |
| Carousel          | Swiper 11                                        |
| Icons             | Lucide React, Tabler Icons React                 |
| Utils             | clsx, tailwind-merge, class-variance-authority, lodash |
| Notifications     | sonner (toast)                                   |
| Form Validation   | Custom (no react-hook-form/zod)                  |
| Package Manager   | npm                                              |

---

## Project Structure

```
petbliss/
├── public/images/             # Static images
├── src/
│   ├── app/                   # Next.js App Router pages & API routes
│   │   ├── admin/             # Admin panel (protected)
│   │   │   ├── login/         # Login page
│   │   │   └── page.tsx       # Dashboard
│   │   ├── api/               # API routes (see API section)
│   │   ├── shop/              # Public catalog page
│   │   ├── layout.tsx         # Root layout (SessionProvider, TopbarMenu, Footer)
│   │   └── page.tsx           # Homepage
│   ├── components/            # UI components
│   │   ├── admin/             # Admin-specific (modals, panels, cards)
│   │   ├── shared/            # Shared (TopbarMenu, ProductCard, Cart, etc.)
│   │   └── ui/                # shadcn/ui primitives
│   ├── config/                # Environment config readers
│   ├── containers/            # Feature/page-level containers
│   ├── lib/                   # Core utilities (mongoose, auth, cloudinary)
│   ├── middleware.ts          # NextAuth route protection
│   ├── models/                # Mongoose models (see Models section)
│   ├── services/              # Client-side API fetch wrappers
│   ├── store/                 # Zustand stores (cartStore)
│   ├── styles/                # globals.css (Tailwind + shadcn variables)
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Constants, helpers, productHelpers
├── .env.local                 # Environment variables
├── .prettierrc                # Prettier config
├── next.config.mjs            # Next.js config (remotePatterns for images)
├── tailwind.config.ts         # Tailwind with shadcn CSS variables
├── tsconfig.json              # TypeScript config (strict, path alias @/*)
├── components.json            # shadcn/ui config
└── package.json               # Dependencies & scripts
```

---

## Development Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Environment Variables

Required in `.env.local`:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/
MONGODB_DB_NAME=production          # Change to "test" for dev
NODE_ENV=development
NEXTAUTH_SECRET=<secret-string>
CLOUDINARY_CLOUD_NAME=<name>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>
```

The config layer at `src/config/` reads these and provides defaults. `MONGODB_DB_NAME` defaults to `"production"`. `NODE_ENV` defaults to `"development"`.

---

## MongoDB / Mongoose Conventions

### Connection (`src/lib/mongoose.ts`)

- **Singleton pattern** via `global.mongoose` cache:
  ```ts
  let cached = (global as any).mongoose || { conn: null, promise: null };
  ```
- `connectDB(customDbName?: string)` — connects to MongoDB, optionally overriding the DB name. **Call this at the top of every API route** before any DB operations.
- `disconnectDB()` — disconnects and clears cache. Rarely needed; connection persists across hot reloads in dev.
- Connection config: `maxPoolSize: 10`, `serverSelectionTimeoutMS: 5000`, `socketTimeoutMS: 45000`.
- The URI parsing logic strips any existing DB name from `MONGODB_URI` and appends the target DB name.

### Model Registration

All models follow this pattern (avoids re-compilation during hot reload):

```ts
import { Schema, model, models } from "mongoose";
const XSchema = new Schema({ ... });
export default models.X || model("X", XSchema);
```

---

## Mongoose Models Reference

### Product (`src/models/product.ts`)

The most complex model. Uses a **discriminator pattern** (`discriminatorKey: "productType"`) to support 7 product types, each with type-specific variant schemas.

| Field          | Type                      | Required | Default   | Notes                                      |
| -------------- | ------------------------- | -------- | --------- | ------------------------------------------ |
| `productType`  | String (enum)             | Yes      | `"other"` | `food`, `accessory`, `snack`, `medicine`, `hygiene`, `toy`, `other` |
| `brand`        | ObjectId → `"Brand"`      | Yes      | —         | Populated on read                          |
| `name`         | String                    | Yes      | —         | Indexed for `$regex` search                |
| `imageURL`     | String                    | Yes      | —         | Cloudinary URL                             |
| `available`    | Boolean                   | Yes      | `true`    |                                            |
| `category`     | ObjectId → `"Category"`   | Yes      | —         | Populated on read                          |
| `byOrder`      | Boolean                   | Yes      | `false`   | Indicates made-to-order                    |
| `isFeatured`   | Boolean                   | Yes      | `false`   | Featured on homepage                       |
| `description`  | String                    | Yes      | —         |                                            |
| `targetAnimal` | String (enum)             | No       | `"all"`   | `dog`, `cat`, `bird`, `fish`, `reptile`, `rodent`, `both`, `all` |
| `variants`     | `[Schema.Types.Mixed]`    | Yes      | `[]`      | Array of variant objects (see below)       |
| Timestamps     | —                         | Auto     | —         | `createdAt`, `updatedAt`                   |

**Variant System:** Even though variant schemas are defined in the file (e.g., `foodVariantSchema`), they are **NOT** attached as subdocuments. Instead, `variants` uses `[Schema.Types.Mixed]`. The variant schemas serve as **validation references only**. Each variant object stored in the array should conform to one of:

- **FoodVariant:** `{ weight, weightUnit, flavor?, ageRange, specialDiet }` + `BaseVariant`
- **AccessoryVariant:** `{ size, color?, material? }` + `BaseVariant`
- **SnackVariant:** `{ weight, weightUnit, flavor?, texture }` + `BaseVariant`
- **MedicineVariant:** `{ dosage, presentation, quantity, requiresPrescription }` + `BaseVariant`
- **HygieneVariant:** `{ volume?, volumeUnit, scent?, productSubtype }` + `BaseVariant`
- **ToyVariant:** `{ size, material?, isInteractive }` + `BaseVariant`
- **GenericVariant:** `{ variantName, specifications? }` + `BaseVariant`

**BaseVariant** (shared fields): `{ sku?, price, discountedPrice, profit, discount, onSale, stock, suppliers: [{ supplier: ObjectId→"Supplier", cost, isPreferred }] }`

Helper functions exported: `getProductModel()`, `getVariantSchema()`, `PRODUCT_TYPES`, `VARIANT_TYPES`.

### Brand (`src/models/brand.ts`)

| Field     | Type    | Required | Notes                              |
| --------- | ------- | -------- | ---------------------------------- |
| `name`    | String  | Yes      | —                                  |
| `slug`    | String  | Yes      | Auto-generated from name (pre-save hook) |
| `imageURL`| String  | Yes      | Cloudinary URL                     |

**Pre-save hook:** `generateSlug(this.name)` — lowercase, spaces → hyphens, strip special chars. No timestamps.

### Category (`src/models/category.ts`)

| Field     | Type    | Required | Notes          |
| --------- | ------- | -------- | -------------- |
| `name`    | String  | Yes      | —              |
| `imageURL`| String  | Yes      | Cloudinary URL |

Minimal model. No indexes, no timestamps, no hooks.

### Supplier (`src/models/supplier.ts`)

| Field           | Type    | Required | Default  | Notes                       |
| --------------- | ------- | -------- | -------- | --------------------------- |
| `name`          | String  | Yes      | —        | `unique: true`              |
| `contactEmail`  | String  | No       | —        |                             |
| `contactPhone`  | String  | No       | —        |                             |
| `address`       | String  | No       | —        |                             |
| `notes`         | String  | No       | —        |                             |
| `isActive`      | Boolean | No       | `true`   |                             |
| `website`       | String  | No       | —        |                             |
| `taxId`         | String  | No       | —        | CUIT/CUIL                   |
| `paymentTerms`  | String  | No       | —        | e.g., "30 días", "contado"  |
| `minimumOrder`  | Number  | No       | —        |                             |
| `deliveryTime`  | String  | No       | —        |                             |
| Timestamps      | —       | Auto    | —        | `createdAt`, `updatedAt`    |

**Indexes:** `{ name: 1 }`, `{ isActive: 1 }`.

---

## API Routes

All routes under `src/app/api/`. Admin-only routes (`POST`, `PUT`, `DELETE`) use `isAdmin(request)` from `@/lib/authUtils` for authorization.

### Products — `/api/products`
- **GET** — List with filters: `keyword` (regex), `category` (by name), `brand` (by slug), `isFeatured` (boolean). Pagination: `page`, `limit`. Returns `{ products, total, page, totalPages }`. Populates `brand` and `category`.
- **POST** (admin) — Create. Accepts `multipart/form-data`: name, description, category (name string), brand (name string), productType, targetAnimal, available, byOrder, isFeatured, variants (JSON string), image (File). Uploads to Cloudinary `"products"` folder. Resolves category/brand names to ObjectIds.

### Products — `/api/products/[id]`
- **DELETE** (admin) — Delete by ID.
- **PUT** (admin) — Update by ID. Accepts JSON body. Resolves category/brand names to ObjectIds. Runs validators. Populates nested supplier refs.

### Brands — `/api/brands`
- **GET** — List all brands.
- **POST** (admin) — Create from `multipart/form-data` (name, image File). Uploads to Cloudinary `"brands"` folder.

### Brands — `/api/brands/metadata`
- **GET** — List brand names only (lean).

### Brands — `/api/brands/[id]`
- **DELETE** (admin) — Delete by ID.

### Categories — `/api/categories`
- **GET** — List all categories.
- **POST** (admin) — Create from `multipart/form-data` (name, image File). Uploads to Cloudinary `"categories"` folder.

### Categories — `/api/categories/metadata`
- **GET** — List category names only (lean).

### Categories — `/api/categories/[id]`
- **DELETE** (admin) — Delete by ID.

### Suppliers — `/api/suppliers`
- **GET** — List all suppliers.
- **POST** (admin) — Create from `multipart/form-data` (name only).

### Suppliers — `/api/suppliers/metadata`
- **GET** — List supplier names only (lean).

### Suppliers — `/api/suppliers/[id]`
- **DELETE** (admin) — Delete by ID.

### Auth — `/api/auth/[...nextauth]`
- NextAuth handler using `authOptions` from `@/lib/authOptions`.

---

## Authentication

- **Library:** NextAuth v4, JWT strategy, Credentials provider.
- **Hardcoded admin user:** username = `petblissadmin`, password hashed with bcrypt.
- **Authorization flow:**
  1. `middleware.ts` wraps `/admin` with `withAuth()`, then checks `token.role === "admin"`. Unauthorized → redirect to `/admin/login`.
  2. API routes call `isAdmin(request)` → `getServerSession(authOptions)` → checks `session.user.role === "admin"`.
  3. Returns `{ authorized: true }` or `{ authorized: false, status: 401/403, error: "..." }`.
- **Type augmentation:** `next-auth.d.ts` adds `role: string` to `User` and `Session`.

---

## Cloudinary Image Upload Pattern

Every POST route that handles images follows this pattern:

```ts
import cloudinary from "@/lib/cloudinary";

const arrayBuffer = await image.arrayBuffer();
const buffer = Buffer.from(arrayBuffer);
const uploadResult = await new Promise((resolve, reject) => {
  cloudinary.uploader.upload_stream(
    { folder: "<folder-name>", resource_type: "image" },
    (error, result) => { if (error) return reject(error); resolve(result); }
  ).end(buffer);
});
const imageUrl = (uploadResult as any).secure_url;
```

Folders used: `"products"`, `"brands"`, `"categories"`. Next.js `next.config.mjs` allows remote images from `images.unsplash.com` and `res.cloudinary.com`.

---

## State Management (Zustand)

Only cart state uses Zustand (`src/store/cartStore.ts`):

```ts
interface CartState {
  items: CartItem[];         // { product, quantity, variant }
  isOpen: boolean;
  name: string;              // Buyer name
  address: string;           // Delivery address
  paymentMethod: string;     // Default: "Efectivo"
  addItem, removeItem, updateQuantity, clearCart;
  openCart, toggleCart;
  setName, setAddress, setPaymentMethod;
}
```

- Items are deduplicated by `product._id + variant index`.
- `addItem` increments quantity if the same product+variant exists.

---

## Type System (`src/types/index.ts`)

All TypeScript types live here. Key patterns:
- **Product types:** `ProductType` union of 7 strings.
- **Variant types:** `BaseVariant` + 7 specific variant types (`FoodVariant`, `AccessoryVariant`, etc.), each with a `variantType` literal discriminator. Union type `ProductVariant`.
- **DTO types:** Parallel DTO variants for create/update operations (IDs as strings, not objects). `ProductDTO` has `brand: string` and `category: string` (name strings, not ObjectIds).
- **Modal types:** `SupplierOption`, `CurrentSupplier`, `CurrentVariant`, `VariantFieldProps`, `ValidationResult` — used by admin product modals.
- **Other:** `CartItem`, `Brand`, `Category`, `Supplier`.

---

## Component Architecture

### Pattern: Container + Components
Each feature page is a **container** in `src/containers/` that orchestrates data fetching, state, and layout composition. Sub-components live in `containers/<feature>/components/`.

Example: `src/containers/catalog/` has:
- `index.tsx` — main container
- `components/` — `CatalogHero`, `CatalogSidebar`, `ProductsGrid`, `MobileFiltersDrawer`, `LoadingSkeleton`
- `hooks/` — `useCatalogFilters`, `useCatalogProducts` (custom hooks with useState/useEffect, debounced search)
- `types/` — local types
- `constants/` — sort options, grid config

### Pattern: Admin Modals
`src/components/admin/createProductModal/` and `editProductModal/` follow a structured pattern:
- `CreateProduct.tsx` / `EditProduct.tsx` — main modal component
- `CreateProduct.container.tsx` / `EditProduct.container.tsx` — state management wrapper (form state, variants array, validations, API calls)
- `components/` — form sections (BasicInfo, VariantsSection, VariantForm, VariantFields per product type)
- `utils/` — constants, validation state utils
- `types.ts` — modal-specific types

### shadcn/ui Components
Located in `src/components/ui/`. Currently: `accordion`, `alertdialog`, `button`, `fade-in-text`. Use the new-york variant style with CSS variables. Run `npx shadcn-ui@latest add` to add more.

---

## Styling Conventions

- **Tailwind CSS** with `tailwindcss-animate` plugin.
- **shadcn/ui** CSS variables defined in `src/styles/globals.css` (light + dark mode via `class` strategy).
- **Utility classes** (in globals.css):
  - `.section-container` — `w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8`
  - `.section-container-extended-r` — same but `pr-0`
  - `.section-y-padding` — `py-12 md:py-16 lg:py-24`
  - `.section-title` — `text-2xl sm:text-3xl md:text-4xl font-bold`
  - `.section-paragraph` — `text-sm sm:text-base md:text-lg`
- **Swiper:** Custom pagination styles in globals.css.
- Prefer composition of existing utility classes. Avoid inline styles.

---

## Design Principles (Clean Code)

All code contributions must follow these principles:

- **SOLID:** Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.
- **KISS (Keep It Simple, Stupid):** Prefer simple, readable solutions over clever abstractions. Avoid premature optimization.
- **DRY (Don't Repeat Yourself):** Extract reusable logic into shared utilities, hooks, or services. Duplication is a signal for abstraction.
- **YAGNI (You Ain't Gonna Need It):** Only build what is currently required. Do not add functionality, props, or abstractions "just in case."

### Practical Application in This Codebase

- **Components:** One component, one responsibility. Split large modals into sub-components (see `createProductModal/components/`).
- **Hooks:** Extract reusable stateful logic into custom hooks (`useCatalogFilters`, `useFeaturedProducts`).
- **Services:** API call logic belongs in `src/services/`, not inline in components.
- **Types:** Define once in `src/types/index.ts`, reuse everywhere. Prefer union types over `any`.
- **Constants:** Magic strings/numbers live in `src/utils/constants.ts` as `as const` objects.
- **Utilities:** Pure functions without side effects go in `src/utils/`. Don't pollute components with business logic.

---

## Code Conventions

### Naming
- **Components:** PascalCase (`ProductCard`, `TopbarMenu`)
- **Files:** camelCase for utils, PascalCase for components, kebab-case for directories
- **Variables/functions:** camelCase
- **Types/interfaces:** PascalCase
- **Constants:** UPPER_SNAKE_CASE (`PRODUCT_TYPE_OPTIONS`)
- **API files:** `route.ts` (Next.js convention)

### Imports
- Path alias `@/*` maps to `./src/*`
- Barrel exports from `index.ts` files in containers, components/shared, config, store, utils
- Import order: external libraries → internal modules → types → styles

### Prettier
```json
{ "semi": false, "singleQuote": true, "tabWidth": 2, "trailingComma": "es5",
  "printWidth": 80, "arrowParens": "always", "endOfLine": "lf" }
```

### Error Handling
- API routes: Always wrap in try/catch. Return `NextResponse.json({ error: message }, { status })`.
- Admin routes: Check auth first with `isAdmin(request)` before any DB operations.
- Client services: Return fallback data on error (e.g., `{ products: [], totalPages: 1 }`).

### Database Query Pattern
```ts
export async function GET/SOMETHING(request: NextRequest) {
  try {
    await connectDB();  // Always first
    // ... query operations using Mongoose
    return NextResponse.json(data);
  } catch (error) {
    console.error("...", error);
    return NextResponse.json({ error: "..." }, { status: 500 });
  }
}
```

### Admin Auth Check Pattern
```ts
const auth = await isAdmin(request);
if (!auth.authorized) {
  return NextResponse.json({ error: auth.error }, { status: auth.status });
}
```

---

## Key Utility Files

| File                          | Purpose                                              |
| ----------------------------- | ---------------------------------------------------- |
| `src/lib/mongoose.ts`         | MongoDB connection (singleton)                       |
| `src/lib/authOptions.ts`      | NextAuth configuration                               |
| `src/lib/authUtils.ts`        | `isAdmin()` server-side auth check                   |
| `src/lib/cloudinary.ts`       | Cloudinary SDK config                                |
| `src/lib/utils.ts`            | `cn()` + `generateWhatsAppTemplateMessage()`         |
| `src/lib/animations.ts`       | Framer Motion presets (fade, slide, stagger, spring) |
| `src/utils/index.ts`          | `generateSlug`, `formatPrice`, `calculateFinalPrice` |
| `src/utils/constants.ts`      | Select options, form templates, FAQ data             |
| `src/utils/productHelpers.ts` | Extensive variant calculation/validation/formatters  |
| `src/store/cartStore.ts`      | Zustand cart state                                   |
| `src/config/`                 | Env config readers for MongoDB, Cloudinary, general  |
| `src/services/`               | Client-side fetch wrappers for all API endpoints     |

---

## Important Notes

- **No test files exist** in the repository. Tests are not yet configured.
- **`PRODUCT_EXAMPLES.ts`** and **`ENV_SETUP_GUIDE.md`** referenced in the README do not exist.
- **The product variant system uses `Schema.Types.Mixed`** for `variants`, not subdocuments. Variant schemas in `product.ts` are purely for validation reference. This means MongoDB has **no schema enforcement** on variant fields at the database level — validation is done in application code (`productHelpers.ts`).
- **Brand lookup in API** is by slug (for querying) or by name (for creation/update). Category lookup is always by name.
- **Price calculations:** `basePrice = cost + cost * (profit / 100)`, `finalPrice = basePrice - basePrice * (discount / 100)`.
- **Currency format:** `Intl.NumberFormat("es-CO", { currency: "ARG" })` — Colombian locale with ARG currency.
- **The admin password** is hardcoded in `src/lib/authOptions.ts`. In production, move to a database model with proper user management.
- **GridFS/Multer** dependencies exist in `package.json` but are **not used** in the codebase.
- **`middleware.ts` matcher** is `"/admin"` (exact match). Sub-routes under `/admin/` are NOT covered. API routes under `/api/` are protected individually via `isAdmin()`.

---

## Extending the Project

### Adding a New Product Type
1. Add the new type string to the `ProductType` union in `src/types/index.ts`.
2. Add a new variant schema in `src/models/product.ts` and register it in `getVariantSchema()`.
3. Create a DTO type in `src/types/index.ts`.
4. Add form field components in `src/components/admin/createProductModal/components/`.
5. Add select options in `src/utils/constants.ts`.
6. Add validation in `src/utils/productHelpers.ts`.
7. Update `PRODUCT_TYPES` and `VARIANT_TYPES` in `src/models/product.ts`.
8. Add defaults in `VARIANT_DEFAULTS`, `VARIANT_DISPLAY_FORMATTERS`, `VARIANT_TYPE_MAP`.

### Adding a New API Resource
1. Create `src/app/api/<resource>/route.ts` (GET + POST).
2. Create `src/app/api/<resource>/[id]/route.ts` (GET + PUT + DELETE).
3. Create `src/app/api/<resource>/metadata/route.ts` if lightweight list is needed.
4. Create `src/services/<resource>Service.ts` for client fetch wrappers.
5. Add types to `src/types/index.ts` if new entity.

### Adding a New shadcn/ui Component
```bash
npx shadcn-ui@latest add <component-name>
```

---

## No-Go & Pitfalls

- **Never** commit `.env.local` or credentials.
- **Do NOT** use `Schema.Types.Subdocument` for variants — the system uses `Mixed` by design.
- **Avoid** calling `connectDB()` in client components — it's server/API only.
- **Do not** hardcode new secrets in source files; use environment variables.
- **Do not** use React `useEffect` for data fetching in Server Components — use `async` components or `fetch()` directly.
- **Avoid** importing server-only modules (mongoose, fs, etc.) in client components.
