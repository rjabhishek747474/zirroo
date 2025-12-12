# Zirroo

![Zirroo Banner](/brain/357cfeb8-895e-41de-afc4-ba0869af4e62/home_discover_page_1765309560300.png)

**Zirroo** is a modern social platform for creating, sharing, and discovering curated lists. Built with a focus on performance, aesthetics, and AI integration, Zirroo allows users to organize their favorite things (movies, books, places, tools) and discover recommendations through semantic search and AI-powered chat.

## 🚀 Features

- **List Curation**: Create rich lists with images, descriptions, and custom items.
- **Social Discovery**: Feed of popular and trending lists. Like, save, and follow creators.
- **AI-Powered**:
  - **Semantic Search**: Find lists by meaning, not just keywords (built with `pgvector` and Gemini Embeddings).
  - **Contextual Chat**: Chat with any list to get insights or recommendations using Gemini AI.
- **Modern UI/UX**: Responsive design with Dark Mode, animations (Framer Motion), and components from Shadcn/UI.
- **Full Stack Type Safety**: End-to-end TypeScript support with NestJS and Next.js.
- **Secure Authentication**: Robust auth via Clerk (Email, Google, Social login).

## 🛠️ Technology Stack

### Frontend (User Interface)
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn/UI](https://ui.shadcn.com/) (Radix UI)
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend (API & Logic)
- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: Clerk SDK
- **AI Integration**: Google Generative AI (Gemini)
- **Validation**: class-validator, class-transformer

### Infrastructure & Database
- **Monorepo**: [Turborepo](https://turbo.build/)
- **Database**: PostgreSQL 16 (with `pgvector` extension)
- **Caching**: Redis
- **Containerization**: Docker & Docker Compose
- **Package Manager**: npm

## 📂 Project Structure

Verified Monorepo structure managed by Turborepo:

```
zirroo/
├── apps/
│   ├── web/                 # Next.js Frontend Application
│   │   ├── src/app/         # App Router Pages & Layouts
│   │   ├── src/components/  # React Components (UI, Features)
│   │   └── ...
│   │
│   └── api/                 # NestJS Backend Application
│       ├── src/auth/        # Authentication Module
│       ├── src/lists/       # List Management Module
│       ├── src/users/       # User Profile Module
│       ├── src/ai/          # AI Service (Gemini)
│       └── ...
│
├── packages/                # Shared internal packages (if any)
├── docker-compose.yml       # Docker services (Postgres, Redis)
├── package.json             # Root dependencies & scripts
└── turbo.json               # Pipeline configuration
```

## 🏁 Getting Started

### Prerequisites
- **Node.js**: v18 or higher
- **Docker**: Desktop running (for DB & Redis)
- **Clerk Account**: For authentication keys
- **Google AI Studio**: For Gemini API key

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/zirroo.git
cd zirroo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create environment files from examples.

**Backend (`apps/api/.env`):**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/zirroo"
REDIS_HOST=localhost
REDIS_PORT=6379
CLERK_SECRET_KEY=sk_test_...
GEMINI_API_KEY=AIzaSy...
```

**Frontend (`apps/web/.env.local`):**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_API_URL=http://localhost:3001
CLERK_SECRET_KEY=sk_test_...
```

### 4. Start Infrastructure
Run PostgreSQL and Redis containers:
```bash
docker compose up -d
```
*Note: This starts `zirroo-postgres` and `zirroo-redis` containers.*

### 5. Initialize Database
Push the Prisma schema to your local database:
```bash
cd apps/api
npx prisma db push
```

### 6. Run Development Servers
Start both Frontend and Backend in parallel:
```bash
# From root directory
npm run dev
```
- **Web App**: [http://localhost:3000](http://localhost:3000)
- **API Server**: [http://localhost:3001](http://localhost:3001)

## 🏗 Project Structure

This project is a **Monorepo** managed by [Turborepo](https://turbo.build/).

### Apps
- **`apps/web`**: Next.js frontend (App Router). Deployment: Vercel.
- **`apps/api`**: NestJS backend. Deployment: Railway.

### Packages
- **`packages/types`**: Shared TypeScript definitions and Enums used by both frontend and backend.

## 🚀 Deployment

### Building for Production
```bash
npm run build
```
This builds both the Next.js app (`.next`) and NestJS app (`dist`).

### Deployment Guide

**Frontend (Vercel):**
1. Connect GitHub repo to Vercel.
2. Set Root Directory to `apps/web`.
3. Add Environment Variables (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, etc.).
4. Deploy.

**Backend (Railway/Render):**
1. Connect GitHub repo.
2. Set Root Directory to `apps/api`.
3. Set Build Command: `npm install && npm run build`.
4. Set Start Command: `npm run start:prod`.
5. Add Environment Variables (`DATABASE_URL`, `CLERK_SECRET_KEY`, etc.).
6. **Important**: Database must support `pgvector` (e.g., Supabase, Neon).

## 🧪 Testing

Run unit and integration tests:
```bash
# Run all tests
npm test

# Run specific app tests
npm test --workspace=@zirroo/api
```

## 🤝 Contributing
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License.
