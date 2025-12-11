FROM node:18-alpine AS base

# Builder stage
FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
# Prune the workspace to just what is needed for the api
RUN turbo prune --scope=@zirroo/api --docker

# Installer stage
FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First clone dependencies
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm ci

# Then build the project
COPY --from=builder /app/out/full/ .
# Generate prisma client
RUN npx --prefix apps/api prisma generate
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
