# 1. Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

# Deklarasi ARG (ini untuk menerima nilai dari luar)
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG PAKASIR_PROJECT_SLUG
ARG PAKASIR_API_KEY

# Set ENV dari ARG (supaya bisa dibaca oleh next build)
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV PAKASIR_PROJECT_SLUG=$PAKASIR_PROJECT_SLUG
ENV PAKASIR_API_KEY=$PAKASIR_API_KEY

COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# 2. Runner
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
