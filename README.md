# ListShare v2

A modern list-curation social platform built with Next.js, NestJS, PostgreSQL, and AI.

## Tech Stack

### Frontend (apps/web)
- **Next.js 14** with App Router
- **TypeScript**
- **Tailwind CSS** + **Shadcn/UI**
- **TanStack Query** for data fetching
- **React Hook Form** + **Zod** for forms
- **Framer Motion** for animations
- **Clerk** for authentication
- **Lucide Icons**

### Backend (apps/api)
- **NestJS** with TypeScript
- **Prisma** ORM
- **PostgreSQL** + **pgvector** for AI embeddings
- **Redis** for caching
- **BullMQ** for job queues
- **Helmet** security headers
- **ThrottlerModule** rate limiting
- **Winston** logging
- **Jest** testing
- **Metascraper** for link previews
- **Gemini AI** + **LangChain.js**

## Quick Start

### 1. Prerequisites
- Node.js 18+
- Docker Desktop

### 2. Start Services
```bash
# Start PostgreSQL and Redis
docker compose up -d postgres redis

# Wait for services to be ready
docker compose logs -f
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment
```bash
cp .env.example .env
# Edit .env with your values (Clerk keys, Gemini API key)
```

### 5. Setup Database
```bash
cd apps/api
npx prisma generate
npx prisma db push
```

### 6. Run Development
```bash
# From root directory
npm run dev
```

- **Web**: http://localhost:3000
- **API**: http://localhost:3001

## Project Structure

```
listshare-v2/
├── apps/
│   ├── web/          # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/         # App Router pages
│   │   │   ├── components/  # React components
│   │   │   ├── hooks/       # Custom hooks
│   │   │   └── lib/         # Utilities
│   │   └── package.json
│   └── api/          # NestJS backend
│       ├── src/
│       │   ├── auth/        # Clerk authentication
│       │   ├── users/       # User management
│       │   ├── lists/       # List CRUD
│       │   ├── items/       # Item management
│       │   ├── ai/          # Gemini + embeddings
│       │   └── links/       # URL unfurling
│       ├── prisma/          # Database schema
│       └── package.json
├── docker-compose.yml
├── turbo.json
└── package.json
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all apps in development |
| `npm run build` | Build all apps |
| `npm run lint` | Lint all apps |
| `npm run test` | Run tests |
| `npm run db:studio` | Open Prisma Studio |

## Deployment

### Supabase (Database)
1. Create project at [supabase.com](https://supabase.com)
2. Enable pgvector extension
3. Copy connection string to `DATABASE_URL`

### Vercel (Frontend)
```bash
vercel deploy --prod
```

### Railway (Backend)
```bash
railway up
```
