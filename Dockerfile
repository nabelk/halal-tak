
# Build stage
FROM oven/bun:1 AS builder

WORKDIR /app

COPY package.json bun.lockb* ./

RUN bun install --frozen-lockfile

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=2048"
RUN bun run build:bun

FROM oven/bun:1-slim AS runner

WORKDIR /app

COPY package.json bun.lockb* ./

RUN bun install --production --frozen-lockfile

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/api ./api

EXPOSE 3000

ENV NODE_ENV=production

CMD ["bun", "run", "api/server.js"]