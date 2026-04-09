# StockWise API

REST API for the StockWise inventory management platform. Built with Express and
TypeScript following a layered architecture — controllers, services, and
repositories — with Prisma as the ORM, MongoDB as the database, JWT authentication,
and Zod for input validation.

---

## Tech stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)

---

## Architecture

```bash
src/
├── _auth/
│   ├── jwt.ts             # Token sign and verify
│   └── routerGuard.ts     # Auth middleware for all protected routes
├── _utils/
│   ├── multer.ts          # File upload handler
│   ├── qrcode.ts          # QR code generation
│   ├── stringGenerator.ts
│   └── supabase.ts        # Supabase storage client
├── _validations/          # Zod schemas per resource
├── controllers/           # Route definitions and HTTP handling
├── services/              # Business logic
├── repositories/          # Database queries via Prisma
└── server.ts
```

---

## API routes

| Resource | Endpoint | Description |
|----------|----------|-------------|
| Company | `/company` | Registration and authentication |
| Product | `/product` | CRUD with image upload and stock tracking |
| Client | `/client` | Client management per company |
| Transaction | `/transaction` | Sales and purchase records |
| Virtual Stock | `/virtualStock` | Container-based stock organization with QR codes |
| Report | `/report` | Report generation with date range |

All routes except `/company` (POST) and `/company/validate` require a valid JWT
passed as `Authorization: Bearded <token>`.

---

## Data model highlights

- **Multi-tenant** — every resource is scoped to a `Company`
- **Product** — tracks stock quantity, sale/purchase prices, technical details (dimensions, weight), photo on Supabase, and QR code
- **Transaction** — covers both sales and purchases, linked to products and clients, with file attachment support
- **VirtualStock** — named containers with categories, physical location, and assigned products

---

## Running locally

```bash
git clone https://github.com/Arthur-Mendes-M/stockwise
cd stockwise
npm install
cp .env.example .env
# set MONGO_DATABASE_URL, SECRET_KEY, SERVER_PORT, and Supabase credentials
npm run dev
```

---

*Built by [Arthur Martins](https://github.com/Arthur-Mendes-M)*
