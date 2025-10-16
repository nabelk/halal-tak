# ====== BUILD STAGE ======
FROM node:lts-alpine AS builder


WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# ====== RUNTIME STAGE ======
FROM node:lts-alpine AS runtime


WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/api ./api

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "api/server.js"]
