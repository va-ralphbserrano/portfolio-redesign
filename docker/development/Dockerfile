# Use official Node.js Alpine image for minimal size
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Add non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Set correct permissions
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Build TypeScript
RUN npm run build

# Expose development port
EXPOSE 3000

# Start development server with hot reloading
CMD ["npm", "run", "dev"]
