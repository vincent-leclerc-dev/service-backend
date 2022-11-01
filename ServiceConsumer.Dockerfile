# JS Build stage

# Docker image base
FROM node:fermium-slim as builder

# Environment
WORKDIR /app

# Install Node modules
COPY package*.json tsconfig*.json ./
RUN npm ci

# Import source code
COPY apps apps

# Build app code and move to build directory to copy with one layer at next stage
RUN npm run build \
    && mkdir -p build \
    && mv dist package*.json build/

# Image build last stage
FROM node:fermium-slim

# Environment
WORKDIR /app

# Import app code and package.json
COPY --from=builder /app/build ./

# Install Node modules for production
RUN npm ci --production

# Start the app
CMD ["node", "dist/apps/service-gateway/main.js"]