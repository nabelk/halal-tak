# ---- Build stage ----
FROM oven/bun:1 AS build

WORKDIR /app

COPY bun.lockb package.json ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

# ---- Runtime stage ----
FROM oven/bun:1-slim AS runtime
WORKDIR /app

COPY --from=build /app ./

# Environment
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Start SSR server (adjust path if needed)
CMD ["bun", "api/server.js"]
