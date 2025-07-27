# Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm install

# Copy the rest of the source
COPY . .

# Build the Next.js app
RUN npm run build

# Production Stage
FROM node:18-alpine AS runner

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built Next.js app and node_modules from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose Next.js port
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]
