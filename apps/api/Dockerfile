FROM node:18-alpine AS base

# Builder stage
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@zirroo/api --docker

# Installer stage
FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First clone dependencies
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json

# Copy schema explicitly to ensure availability before install/generate
COPY apps/api/prisma/schema.prisma ./apps/api/prisma/schema.prisma

# Install dependencies (using npm install for robustness with pruned lockfiles)
RUN npm install

# Copy full source
COPY --from=builder /app/out/full/ .

# Generate prisma client explicitly
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

# Build the project
RUN npm run build --workspace=@zirroo/api

# Runner stage
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=installer /app/apps/api/dist ./dist
COPY --from=installer /app/apps/api/package.json ./package.json
COPY --from=installer /app/node_modules ./node_modules

# Expose port
EXPOSE 3001

CMD ["node", "dist/main"]
