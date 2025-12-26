# ⚙️ LocalGems Backend - Robust API & Engine

This is the backend API for **LocalGems**, providing secure authentication, data persistence, and payment processing.

---

## 🚀 Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) (ESM)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Auth**: [JWT](https://jwt.io/)
- **Validation**: [Zod](https://zod.dev/)
- **Payment**: [Stripe](https://stripe.com/)
- **Dev Tools**: [tsx](https://tsx.is/) (Modern TypeScript execution)

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── config/      # Environment variables & secrets
│   ├── middlewares/ # Auth guards, Error handlers, CORS
│   ├── modules/     # Domain-specific modules (Auth, Tour, User)
│   │   ├── [Module]/
│   │   │   ├── module.controller.ts
│   │   │   ├── module.service.ts
│   │   │   └── module.route.ts
│   ├── routes/      # Global router aggregation
│   └── utils/       # Shared utilities (Response helpers, Prisma client)
├── server.ts        # Entry point
└── app.ts           # Express initialization
```

---

## 🔐 Security Features

- **JWT Stateless Auth**: Secure token-based access with expiration.
- **Bcrypt Hashing**: Industry-standard password encryption.
- **CORS Protection**: Controlled access for frontend cross-origin requests.
- **Graceful Shutdown**: Handles process signals to close DB connections safely.

---

## 🔌 API Endpoints (v1)

### 👤 Authentication (`/auth`)
| Endpoint | Method | Payload | Description |
|----------|--------|---------|-------------|
| `/signup` | `POST` | `name, email, password, role` | Register a new account |
| `/login` | `POST` | `email, password` | Receive Access Token & User Data |

### 🗺️ Tours (`/tours`)
| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/` | `GET` | Public | Fetch all available tours |
| `/:id` | `GET` | Public | Fetch single tour with relations |
| `/` | `POST` | Guide/Admin | Create a new tour experience |
| `/:id` | `PATCH` | Guide/Admin | Update existing tour data |

### 💳 Bookings (`/bookings`)
| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/` | `POST` | Tourist | Initialize booking & Stripe intent |
| `/my-bookings`| `GET` | Tourist | Retrieve current user's trips |

---

## 💻 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file:
```env
DATABASE_URL="postgresql://..."
JWT_ACCESS_SECRET="your_secret"
STRIPE_SECRET_KEY="your_key"
PORT=5000
```

### 3. Database Migration
```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Run Development
```bash
npm run dev
```

---

## 🚢 Deployment

Optimized for **Render**, **Railway**, or **Railway**. Use `npm run build` to generate the production `dist` folder.

---
Built with 🛡️ by the LocalGems Engineering Team.
